<template>
  <div class="table">
    <table>
      <thead v-if="columns && columns.length">
        <tr>
          <th v-for="col in columns" :key="col.id" :style="col.style">
            {{ col.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- empty table -->
        <tr v-if="!rows || !rows.length">
          <td :colspan="columns.length" class="empty">
            <span class="cell" :class="{ error: 'error-message' }">
              <template v-if="error">{{ error }}</template>
              <template v-else-if="!rows"> </template>
              <template v-else-if="!rows.length">Table is empty...</template>
            </span>
          </td>
        </tr>
        <!-- table's rows -->
        <tr v-else v-for="(row, idx) in rows" :key="idx">
          <td
            v-for="col in columns"
            :key="`${idx}-${col.id}`"
            :class="`td-${col.type}`"
            :aria-label="col.name"
          >
            <span class="cell">
              {{ row[col.id] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",

  props: {
    error: {
      required: true,
      type: String
    },
    columns: {
      required: true,
      type: Array
    },
    rows: {
      required: true,
      type: [Boolean, Array]
    }
  }
};
</script>

<style scoped lang="scss">
.table.loading {
  opacity: 0.5;
}
table {
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    padding: 5px;
    border: 1px solid #ddd;
  }
  th {
    font-weight: 500;
    background-color: #eee;
    text-align: center;
  }
  td {
    font-size: 13px;
    font-weight: 300;
    background-color: #fff;
    &.empty {
      text-align: center;
      padding: 20px 0;
    }
    &.td-phone {
      font-weight: 700;
    }
  }
  @media (max-width: 640px) {
    thead {
      display: none;
    }
    tr {
      border-bottom: 30px solid #fff;
    }
    td {
      display: block;
      text-align: right;
      font-size: 12px;
      border-bottom: none;

      &:last-of-type {
        border-bottom: 1px solid #ddd;
      }

      &:before {
        font-weight: 700;
        content: attr(aria-label);
        float: left;
        width: 20%;
        text-align: left;
        font-size: 11px;
      }
      .cell {
        display: inline-block;
        width: 80%;
        text-align: left;
        white-space: normal;
      }
    }
  }
}
span.error-message {
  color: red;
}
</style>
