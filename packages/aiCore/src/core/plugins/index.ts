// 核心类型和接口
import type { AiPlugin, AiRequestContext } from './types'
export type { AiPlugin, AiRequestContext, HookResult, HookType, PluginManagerConfig } from './types'

// 插件管理器
export { PluginManager } from './manager'

// 工具函数
export function createContext(providerId: string, modelId: string, originalParams: any): AiRequestContext {
  return {
    providerId,
    modelId,
    originalParams,
    metadata: {},
    startTime: Date.now(),
    requestId: `${providerId}-${modelId}-${Date.now()}-${Math.random().toString(36).slice(2)}`
  }
}

// 插件构建器 - 便于创建插件
export function definePlugin(plugin: AiPlugin): AiPlugin
export function definePlugin<T extends (...args: any[]) => AiPlugin>(pluginFactory: T): T

export function definePlugin(plugin: AiPlugin | ((...args: any[]) => AiPlugin)) {
  return plugin
}

export { createLoggingPlugin } from './built-in/logging'
