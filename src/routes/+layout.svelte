<script>
	import { Sidebar } from '$components';
	import '$core/styles/index.css';
</script>

<div class="flex flex-col lg:flex-row bg-slate-700 text-white">
	<Sidebar />
	<div class="px-4">
		<slot />
	</div>
</div>
