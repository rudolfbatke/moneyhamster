<script>
  import Input from './Input.svelte';

  export let open = false;
</script>

<dialog {open}>
  <form>
    <p>PIN:</p>
    <Input
      inputProps={{
        type: 'password',
        autofocus: true,
        inputmode: 'numeric',
        required: true
      }}
      inputAlign="center"
    />
  </form>
</dialog>

<style>
  dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 100;
    padding: unset;
    margin: unset;
    border: unset;
    text-align: center;
  }
  form {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
  }
</style>
