import { paramCase } from 'change-case'

type PropertyRegistry = Map<string, Record<string, string>>

const defaultPropertyRegistry: PropertyRegistry = new Map()

export function CSSProperty(registry: PropertyRegistry = defaultPropertyRegistry) {
  return function(target: Object, propertyKey: string) {
    const key = target.constructor.name
    if (registry.has(key)) {
      const properties = registry.get(key)
      registry.set(key, { ...properties, [propertyKey]: `--${paramCase(propertyKey)}` })
    } else {
      registry.set(key, { [propertyKey]: `--${paramCase(propertyKey)}` })
    }
  }
}

export function CSSPaint(registry: PropertyRegistry = defaultPropertyRegistry) {
  return function(originalClass: any) {
    const key = originalClass.name
    Object.defineProperty(originalClass, 'inputProperties', {
      get() {
        const properties = registry.get(key)
        if (properties) {
          return Object.values(properties)
        } else {
          return []
        }
      },
      enumerable: true,
      configurable: true
    })
    return originalClass
  }
}

export function CSSPaintMethod(registry: PropertyRegistry = defaultPropertyRegistry) {
  return function(target: Object, _: string, descriptor: PropertyDescriptor) {
    const key = target.constructor.name
    const method = descriptor.value
    descriptor.value = function() {
      const [ctx, size, props] = arguments as unknown as any[]
      const properties = registry.get(key)
      if (properties && props) {
        Object.keys(properties).forEach(k => {
          const parameter = properties[k]
          if (!(target as any)[k]) {
            (target as any)[k] = props.get(parameter).toString()
          }
        })
      }
      const result = method.apply(this, [ctx])
      return result
    }
    return descriptor
  }
}
