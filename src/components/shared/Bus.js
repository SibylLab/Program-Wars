/**
 * The Bus is used to emit and respond to events in a vuejs program.
 *
 * `bus.$on` will generally be called in the `created` section of a component that
 * wants to listen for an event.
 *
 * `bus.$off` should be called in the `beforeDestroy` section to ensure the listener
 * will be removed when the component is removed, otherwise it may persist and
 * catch events when it shouldn't.
 *
 * @example
 * import { bus } from '@/components/shared/Bus'
 *
 * // emit an event with event name and an argument
 * bus.$emit('event-name', arg)
 * 
 * // Add a listener for an event
 * bus.$on('event-name', callbackFunction)
 *
 * // Remove a listener for an event
 * bus.$off('event-name', callbackFunction)
 *
 * @module Bus
 */

import Vue from 'vue'

export const bus = new Vue()
