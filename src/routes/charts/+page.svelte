<script>
  import BarChart from '$lib/components/BarChart.svelte';
  import List from '$lib/components/List.svelte';
  import Topbar from '$lib/components/Topbar.svelte';
  import LineChart from '$lib/components/LineChart.svelte';
  import PieChart from '$lib/components/PieChart.svelte';
  import { t } from '$lib/utilities/i18n';

  const items = [
    {
      title: 'Bar Chart',
      component: BarChart
    },
    {
      title: 'Line Chart',
      component: LineChart
    },
    {
      title: 'Pie Chart',
      component: PieChart
    }
  ];
</script>

<Topbar>{$t('charts')}</Topbar>
<List {items} />
