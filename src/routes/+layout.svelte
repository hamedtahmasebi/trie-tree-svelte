<script>
	import { Sidebar } from '$components';
	import '$core/styles/index.css';
</script>

<div class="flex bg-slate-700 text-white">
	<Sidebar />
	<slot />
</div>
