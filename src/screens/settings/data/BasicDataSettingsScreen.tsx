import { useNavigation } from '@react-navigation/native'
import { ChevronRight, FileText, Folder, FolderOpen, RotateCcw, Save, Trash2 } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, Text, useTheme, XStack, YStack } from 'tamagui'

import { SettingContainer, SettingGroup, SettingGroupTitle, SettingRow } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { NavigationProps } from '@/types/naviagate'

interface SettingItemConfig {
  title: string
  screen?: string
  icon: React.ReactElement
  subtitle?: string
  danger?: boolean
  onPress?: () => void
}

interface SettingGroupConfig {
  title: string
  items: SettingItemConfig[]
}

export default function BasicDataSettingsScreen() {
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()
  const { t } = useTranslation()

  const settingsItems: SettingGroupConfig[] = [
    {
      title: t('settings.data.title'),
      items: [
        {
          title: t('settings.data.backup'),
          screen: 'data-backup',
          icon: <Save size={24} />
        },
        {
          title: t('settings.data.recovery'),
          screen: 'data-recovery',
          icon: <Folder size={24} />
        },
        {
          title: t('settings.data.reset'),
          icon: <RotateCcw size={24} color="red" />,
          danger: true,
          onPress: () => {
            // 处理数据重置逻辑
            console.log('Data reset pressed')
          }
        }
      ]
    },
    {
      title: t('settings.data.data.title'),
      items: [
        {
          title: t('settings.data.app_data'),
          icon: <FolderOpen size={24} />,
          subtitle: 'My phone/Cherry'
        },
        {
          title: t('settings.data.app_logs'),
          icon: <FileText size={24} />,
          subtitle: 'My phone/Cherry/Logs'
        },
        {
          title: t('settings.data.clear_cache.button'),
          icon: <Trash2 size={24} color="red" />,
          danger: true,
          onPress: () => {
            // 处理清除缓存逻辑
            console.log('Clear cache pressed')
          }
        }
      ]
    }
  ]

  return (
    <SafeAreaContainer style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar title={t('settings.data.basic_title')} onBackPress={() => navigation.goBack()} />

      <ScrollView flex={1} backgroundColor="$background">
        <SettingContainer>
          <YStack gap={24} flex={1}>
            {settingsItems.map(group => (
              <Group key={group.title} title={group.title}>
                {group.items.map(item => (
                  <SettingItem
                    key={item.title}
                    title={item.title}
                    screen={item.screen}
                    icon={item.icon}
                    subtitle={item.subtitle}
                    danger={item.danger}
                    onPress={item.onPress}
                  />
                ))}
              </Group>
            ))}
          </YStack>
        </SettingContainer>
      </ScrollView>
    </SafeAreaContainer>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <YStack gap={8}>
      <SettingGroupTitle>{title}</SettingGroupTitle>
      <SettingGroup>{children}</SettingGroup>
    </YStack>
  )
}

function SettingItem({ title, screen, icon, subtitle, danger, onPress }: SettingItemProps) {
  const navigation = useNavigation<NavigationProps>()

  const handlePress = () => {
    if (onPress) {
      onPress()
    } else if (screen) {
      navigation.navigate(screen as any)
    }
  }

  return (
    <SettingRow onPress={handlePress}>
      <XStack alignItems="center" gap={12}>
        {icon}
        <YStack>
          <Text fontSize="$5" color={danger ? 'red' : undefined}>
            {title}
          </Text>
          {subtitle && (
            <Text theme="alt2" fontSize="$2">
              {subtitle}
            </Text>
          )}
        </YStack>
      </XStack>
      {screen && <ChevronRight size={24} color="$colorFocus" />}
    </SettingRow>
  )
}

interface SettingItemProps {
  title: string
  screen?: string
  icon: React.ReactElement
  subtitle?: string
  danger?: boolean
  onPress?: () => void
}
