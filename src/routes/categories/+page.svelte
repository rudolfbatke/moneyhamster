<script>
  import Button from '$lib/components/Button.svelte';
  import Dialog from '$lib/components/Dialog.svelte';
  import Float from '$lib/components/Float.svelte';
  import Input from '$lib/components/Input.svelte';

  import Topbar from '$lib/components/Topbar.svelte';
  import AddIcon from '$lib/icons/AddIcon.svelte';
  import { currency, getYearMonth, monthSlashYear, now } from '$lib/utilities/formatter';
  import { getNextId, sortCategories, undeletedItems } from '$lib/utilities/list';
  import { expensesStore, categoriesStore, pinStore } from '$lib/stores';
  import { categoryColors } from '$lib/settings';
  import { openAppDB } from '$lib/db';
  import { syncData } from '$lib/utilities/sync';
  import NoItems from '$lib/components/NoItems.svelte';

  /** @type {Category | undefined}*/
  let editCategory = undefined;

  /** @type {boolean}*/
  let categoryIsNew = false;

  /** @type {HTMLFormElement | undefined}*/
  let form = undefined;

  let colorDialogIsOpen = false;

  $: expenses = undeletedItems($expensesStore);

  $: categories = undeletedItems($categoriesStore);

  $: categoryMonthlyAmounts = expenses.reduce((/**@type CategoryMonthlyAmounts*/ acc, e) => {
    const { date: expenseDate, amount: expenseAmount, category: categoryId } = e;
    const month = getYearMonth(expenseDate);
    const monthlyAmounts = (acc[categoryId] = acc[categoryId] || {});
    const monthlyAmount = (monthlyAmounts[month] = monthlyAmounts[month] || {
      total: 0,
      expenses: []
    });
    monthlyAmount.total += expenseAmount;
    monthlyAmount.expenses.push(e);
    return acc;
  }, {});

  $: months = Object.keys(categoryMonthlyAmounts)
    .reduce((/** @type {string[]} */ acc, categoryId) => {
      const monthlyAmounts = categoryMonthlyAmounts[Number(categoryId)];
      Object.keys(monthlyAmounts).forEach((month) => {
        if (!acc.includes(month)) acc.push(month);
      });
      return acc;
    }, [])
    .sort();

  $: years = months
    .map((m) => m.split('-')[0])
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort();

  $: monthlyTotals = months.map((month) => {
    return categories.reduce((acc, category) => {
      const monthlyAmounts = categoryMonthlyAmounts[category.id];
      const monthlyAmount = monthlyAmounts?.[month];
      return acc + (monthlyAmount?.total || 0);
    }, 0);
  });

  $: yearlyTotals = years.map((year) => {
    return categories.reduce((acc, category) => {
      return acc + sumYearByCategory(category.id, year);
    }, 0);
  });

  function setNewCategory() {
    categoryIsNew = true;
    editCategory = {
      id: getNextId(categories),
      name: '',
      color: 'Gray',
      updatedAt: now()
    };
  }

  /** @param {DialogAction} action */
  async function onDialogButtonClick(action) {
    if (editCategory === undefined) return;

    if (action === 'close') {
      editCategory = undefined;
      categoryIsNew = false;
      return;
    }

    if (action === 'delete') {
      editCategory.deletedAt = editCategory.deletedAt = now();
    }

    if (action === 'save') {
      if (!form?.reportValidity()) return;

      editCategory = {
        ...editCategory,
        name: form.issue.value
      };
    }

    let updatedCategories = [...categories];

    // if new category, add to list of categories and sort
    const index = updatedCategories.findIndex((e) => e.id === editCategory?.id);
    if (index === -1) {
      updatedCategories = sortCategories([...updatedCategories, editCategory]);
    } else {
      updatedCategories[index] = editCategory;
    }

    categoriesStore.set(updatedCategories);

    const db = await openAppDB();
    await db.put('categories', editCategory);
    syncData($pinStore);

    editCategory = undefined;
    categoryIsNew = false;
  }

  /**
   * @param {number} categoryId
   * @param {string} year
   */
  function sumYearByCategory(categoryId, year) {
    return months
      .filter((m) => m.startsWith(year))
      .reduce((acc, month) => {
        const monthlyAmounts = categoryMonthlyAmounts[categoryId];
        const monthlyAmount = monthlyAmounts?.[month];
        return acc + (monthlyAmount?.total || 0);
      }, 0);
  }

  /**
   * @param {string|undefined} color
   */
  function setColor(color) {
    if (!editCategory) return;
    editCategory = {
      ...editCategory,
      color
    };
    colorDialogIsOpen = false;
  }
</script>

<Topbar>Categories</Topbar>

{#if categories.length === 0}
  <NoItems />
{:else}
  <div class="table">
    <div class="header row">
      <div class="cell category">Category</div>
      <div class="cells">
        {#each months as month}
          <div class="cell">
            {monthSlashYear(month)}
          </div>
        {/each}
        {#each years as year}
          <div class="cell">
            {year}
          </div>
        {/each}
      </div>
    </div>

    {#each categories as category}
      <div class="content row">
        <div
          on:click={() => (editCategory = category)}
          on:keypress={() => (editCategory = category)}
          class="cell category"
          style={`color: ${category.color}`}
          role="menuitem"
          tabindex="0"
        >
          {category.name}
        </div>
        <div class="cells">
          {#each months as month}
            <div class="cell">
              {currency(categoryMonthlyAmounts[category.id]?.[month]?.total || 0, 0)}
            </div>
          {/each}
          {#each years as year}
            <div class="cell">
              {currency(sumYearByCategory(category.id, year), 0)}
            </div>
          {/each}
        </div>
      </div>
    {/each}

    <div class="totals row">
      <div class="cell category">Totals</div>
      <div class="cells">
        {#each monthlyTotals as total}
          <div class="cell">
            {currency(total, 0)}
          </div>
        {/each}
        {#each yearlyTotals as total}
          <div class="cell">
            {currency(total, 0)}
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<Dialog onButtonClick={onDialogButtonClick} open={!!editCategory} deleteButton={!categoryIsNew}>
  <span slot="title">{categoryIsNew ? 'New Category' : 'Edit Category'}</span>
  <form bind:this={form}>
    <Input
      inputProps={{
        id: 'issue',
        placeholder: 'e.g. Food',
        required: true,
        value: editCategory?.name || ''
      }}
      label="Name"
      labelWidth="3rem"
    />
    <Input
      backgroundColor={editCategory?.color}
      cursor="pointer"
      labelWidth="3rem"
      label="Color"
      inputProps={{
        id: 'color',
        'on:click': () => (colorDialogIsOpen = true),
        readonly: true,
        value: editCategory?.color
      }}
    />
  </form>
</Dialog>
<Dialog
  actionButtons={false}
  onButtonClick={() => (colorDialogIsOpen = false)}
  open={colorDialogIsOpen}
>
  <span slot="title">Pick a Color</span>
  <div class="color-select">
    {#each categoryColors as color}
      <div
        class="color"
        style={`background: ${color}`}
        on:click={() => setColor(color)}
        on:keypress={() => setColor(color)}
        role="menuitem"
        tabindex="0"
      />
    {/each}
  </div>
</Dialog>

<Float>
  <Button variant="fill" color="primary" on:click={() => setNewCategory()}>
    <AddIcon />
  </Button>
</Float>

<style>
  .table {
    width: fit-content;
  }

  .header {
    position: sticky;
    top: 0;
    z-index: 5;
  }

  .header,
  .totals {
    font-weight: bold;
  }

  .totals {
    position: sticky;
    bottom: 0;
    z-index: 4;
  }

  .row {
    display: flex;
  }

  .row:hover .cell {
    background: var(--background-hover) !important;
  }

  .cells {
    display: flex;
    z-index: 2;
    padding-right: 1rem;
  }

  .cell {
    width: 4rem;
    height: 3rem;
    background: var(--background-color);
    display: flex;
    align-items: center;
    justify-content: right;
  }

  .category.cell {
    width: 6rem;
    min-width: 6rem;
    position: sticky;
    left: 0;
    z-index: 3;
    padding-left: 1rem;
    word-break: break-all;
    justify-content: left;
  }

  .content > .category {
    cursor: pointer;
  }

  .color-select {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }

  .color-select > div {
    width: calc(25%);
    height: 50px;
    cursor: pointer;
  }

  .color:hover {
    opacity: 0.8;
  }

  .color:first-child {
    border-top-left-radius: 1rem;
  }
  .color:nth-child(4) {
    border-top-right-radius: 1rem;
  }
  .color:nth-last-child(4) {
    border-bottom-left-radius: 1rem;
  }
  .color:last-child {
    border-bottom-right-radius: 1rem;
  }
</style>
