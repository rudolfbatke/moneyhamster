<script>
  import { goto } from '$app/navigation';

  const redirectAfterLogin = () => {
    goto('/');
  };
</script>

<hanko-auth on:onAuthFlowCompleted={redirectAfterLogin} />
