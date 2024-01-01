<script>
  import { t } from '$lib/utilities/i18n';
</script>

<div>
  <img src="/icons/favicon.svg" alt="Hamster Cash Logo" />
  <h1>HAMSTER.CASH</h1>
  <h2>{t('slogan')}</h2>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 10rem;
    height: 10rem;
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 0;
  }
</style>
