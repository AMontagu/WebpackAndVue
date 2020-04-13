 
import Vue from 'vue';
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// eslint-disable-next-line
const requireComponent = require.context(
	'@/components/base-components', true, /[\w-]+\.vue/
)

export default function() {
	requireComponent.keys().forEach((fileName) => {
		const componentConfig = requireComponent(fileName)

		const componentName = upperFirst(
			camelCase(fileName.replace(/\.vue/, '').replace(/^\.\//, '').replace(/\.w+$/, ''))
		)

		Vue.component(componentName, componentConfig.default || componentConfig)
	})
}