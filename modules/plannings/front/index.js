import 'css/planning.scss'

import {addHook} from 'js/Services/HookHandler';
import {hasPermission} from 'js/Models/User';

import PlanningView from 'tpl/PlanningView.vue';
import PlanningStatusIndex from 'tpl/PlanningStatusIndex.vue';
import PlanningIndex from 'tpl/PlanningIndex.vue';

import CalendarCheckIcon from 'vue-material-design-icons/CalendarCheck.vue';
import TagIcon from 'vue-material-design-icons/Tag.vue';

import {getActivesModules} from 'js/Models/Module';

if (getActivesModules().indexOf('plannings') >= 0) {

	addHook('register_route', () => {
		return {path: '/planning/view/:id/:page?', component: PlanningView}
	});
	addHook('register_route', () => {
		return {path: '/task_status/:page?', component: PlanningStatusIndex}
	});
	addHook('register_route', () => {
		return {path: '/planning/:page?', component: PlanningIndex}
	});

	addHook('register_menu_section', () => {
		return {
			name: 'cadencio_plannings',
			title: 'Plannings',
			canDisplay: hasPermission('planning', 'read') || hasPermission('planning_status', 'read')
		}
	});

	addHook('register_menu', () => {
		return {
			icon: CalendarCheckIcon,
			section: 'cadencio_plannings',
			title: 'Plannings',
			to: '/planning',
			canDisplay: hasPermission('planning', 'read')
		}
	});

	addHook('register_menu', () => {
		return {
			icon: TagIcon,
			section: 'cadencio_plannings',
			title: 'Task Status',
			to: '/task_status',
			canDisplay: hasPermission('planning_status', 'read')
		}
	});

}