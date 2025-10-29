
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors } from '@/styles/commonStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '@/app/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { TradeRequest } from '@/types/database';

export default function TradeRequestsScreen() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<TradeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');

  useEffect(() => {
    if (user) {
      loadTradeRequests();
    }
  }, [user, activeTab]);

  const loadTradeRequests = async () => {
    if (!user) return;

    try {
      const query = supabase
        .from('trade_requests')
        .select(
          `
          *,
          sender:profiles!trade_requests_sender_id_fkey(*),
          receiver:profiles!trade_requests_receiver_id_fkey(*),
          skill_to_teach:skills!trade_requests_skill_to_teach_id_fkey(*),
          skill_to_learn:skills!trade_requests_skill_to_learn_id_fkey(*)
        `
        )
        .order('created_at', { ascending: false });

      if (activeTab === 'received') {
        query.eq('receiver_id', user.id);
      } else {
        query.eq('sender_id', user.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error loading trade requests:', error);
      Alert.alert('Error', 'Failed to load trade requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('trade_requests')
        .update({ status: 'accepted', updated_at: new Date().toISOString() })
        .eq('id', requestId);

      if (error) throw error;

      Alert.alert('Success', 'Trade request accepted! You can now schedule a session.');
      loadTradeRequests();
    } catch (error) {
      console.error('Error accepting request:', error);
      Alert.alert('Error', 'Failed to accept request');
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    Alert.alert('Reject Request', 'Are you sure you want to reject this trade request?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reject',
        style: 'destructive',
        onPress: async () => {
          try {
            const { error } = await supabase
              .from('trade_requests')
              .update({ status: 'rejected', updated_at: new Date().toISOString() })
              .eq('id', requestId);

            if (error) throw error;
            loadTradeRequests();
          } catch (error) {
            console.error('Error rejecting request:', error);
            Alert.alert('Error', 'Failed to reject request');
          }
        },
      },
    ]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return colors.warning;
      case 'accepted':
        return colors.success;
      case 'rejected':
        return colors.error;
      case 'cancelled':
        return colors.textSecondary;
      default:
        return colors.textSecondary;
    }
  };

  const renderTradeRequest = (request: TradeRequest) => {
    const isReceived = activeTab === 'received';
    const otherUser = isReceived ? request.sender : request.receiver;

    return (
      <View key={request.id} style={styles.requestCard}>
        <View style={styles.requestHeader}>
          {otherUser?.avatar_url ? (
            <Image source={{ uri: otherUser.avatar_url }} style={styles.userAvatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <IconSymbol name="person.fill" size={24} color={colors.textSecondary} />
            </View>
          )}
          <View style={styles.requestHeaderText}>
            <Text style={styles.userName}>{otherUser?.name || 'User'}</Text>
            <View style={styles.statusBadge} style={{ backgroundColor: getStatusColor(request.status) + '20' }}>
              <Text style={[styles.statusText, { color: getStatusColor(request.status) }]}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.skillsContainer}>
          <View style={styles.skillRow}>
            <IconSymbol name="arrow.up.circle.fill" size={20} color={colors.success} />
            <Text style={styles.skillLabel}>They teach:</Text>
            <Text style={styles.skillName}>{request.skill_to_teach?.name}</Text>
          </View>
          <View style={styles.skillRow}>
            <IconSymbol name="arrow.down.circle.fill" size={20} color={colors.primary} />
            <Text style={styles.skillLabel}>You teach:</Text>
            <Text style={styles.skillName}>{request.skill_to_learn?.name}</Text>
          </View>
        </View>

        {request.message && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageLabel}>Message:</Text>
            <Text style={styles.messageText}>{request.message}</Text>
          </View>
        )}

        {isReceived && request.status === 'pending' && (
          <View style={styles.actionButtons}>
            <Pressable
              style={[styles.actionButton, styles.rejectButton]}
              onPress={() => handleRejectRequest(request.id)}
            >
              <Text style={styles.rejectButtonText}>Reject</Text>
            </Pressable>
            <Pressable style={styles.actionButton} onPress={() => handleAcceptRequest(request.id)}>
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.acceptButtonGradient}
              >
                <Text style={styles.acceptButtonText}>Accept</Text>
              </LinearGradient>
            </Pressable>
          </View>
        )}

        {request.status === 'accepted' && (
          <Pressable style={styles.scheduleButton}>
            <Text style={styles.scheduleButtonText}>Schedule Session</Text>
            <IconSymbol name="calendar" size={16} color={colors.primary} />
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Trade Requests</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <Pressable
            style={[styles.tab, activeTab === 'received' && styles.activeTab]}
            onPress={() => setActiveTab('received')}
          >
            <Text style={[styles.tabText, activeTab === 'received' && styles.activeTabText]}>Received</Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === 'sent' && styles.activeTab]}
            onPress={() => setActiveTab('sent')}
          >
            <Text style={[styles.tabText, activeTab === 'sent' && styles.activeTabText]}>Sent</Text>
          </Pressable>
        </View>

        {/* Requests List */}
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : requests.length > 0 ? (
            requests.map(renderTradeRequest)
          ) : (
            <View style={styles.emptyState}>
              <IconSymbol name="tray.fill" size={64} color={colors.textSecondary} />
              <Text style={styles.emptyStateTitle}>No trade requests</Text>
              <Text style={styles.emptyStateText}>
                {activeTab === 'received'
                  ? 'You haven&apos;t received any trade requests yet'
                  : 'You haven&apos;t sent any trade requests yet'}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  headerRight: {
    width: 40,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.card,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  requestCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestHeaderText: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  skillsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  skillLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  skillName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  messageContainer: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  messageLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  rejectButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    alignItems: 'center',
  },
  rejectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  acceptButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  scheduleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
