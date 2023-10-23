<script>
  import { goto } from '$app/navigation';

  const redirectAfterLogin = () => {
    goto('/info#sync');
  };
</script>

<hanko-auth on:onAuthFlowCompleted={redirectAfterLogin} />
