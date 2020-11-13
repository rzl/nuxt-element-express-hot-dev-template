import Vue from 'vue';
import { formatDateTime, forkJson } from '@/utils'
import * as utils from '@/utils'
Vue.prototype.$utils = utils
Vue.prototype.$formatDateTime = formatDateTime
Vue.prototype.$forkJson = forkJson
