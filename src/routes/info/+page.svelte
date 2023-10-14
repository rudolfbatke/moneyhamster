<script>
  import Backup from '$lib/components/Backup.svelte';
  import List from '$lib/components/List.svelte';
  import Story from '$lib/components/Story.svelte';
  import Sync from '$lib/components/Sync.svelte';
  import Topbar from '$lib/components/Topbar.svelte';

  const items = [
    {
      title: 'The Story of the Hamster Cash',
      component: Story
    },
    {
      title: 'Backup and Restore',
      component: Backup
    },
    {
      title: 'Sync Data',
      component: Sync
    }
  ];
</script>

<Topbar>Info</Topbar>

<List {items} />
