<template>
  <div class="json-list">
    <ListPagination v-model="currentUserID" :isPrevButtonVisible="firstIndex >= 10"
      :isNextButtonVisible="lastIndex <= typicodeDataLength - 10" :options="selectOptions" :userID="currentUserID"
      @prev="decrementSliceIndexes" @next="incrementSliceIndexes" />
    <div class="json-list__list">
      <div v-for="element in filteredTypicodeData" :key="element.id" class="json-list__element">
        <div class="json-list__id">
          {{ element.userId }}
        </div>
        <div>
          <div class="json-list__header">
            {{ element.title }}
          </div>
          <div class="json-list__body">
            {{ element.body }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import ListPagination from "./ListPagination.vue";
const isDataFetched = ref(false)
const typicodeData = ref();
const typicodeDataLength = ref();
const filteredTypicodeData = ref();
const selectOptions = ref();
const firstIndex = ref(0);
const currentUserID = ref(1);
const lastIndex = ref(9);

function getDataFromTypicode() {
  try {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        typicodeData.value = json;
        isDataFetched.value = true;
      });
  } catch (error) {
    console.error(error);
  }
}
function filterTypicodeData() {
  filteredTypicodeData.value = typicodeData.value.slice(
    firstIndex.value,
    lastIndex.value
  );
  sortDataTitlesAlphabetically(filteredTypicodeData.value);
}
function getSelectOptions() {
  selectOptions.value = Array.from(
    { length: typicodeDataLength.value / 10 },
    (_, i) => i + 1
  );
}
function decrementSliceIndexes() {
  if (firstIndex.value >= 10) {
    firstIndex.value -= 10;
    lastIndex.value -= 10;
    currentUserID.value--;
    filterTypicodeData();
  }
}
function incrementSliceIndexes() {
  if (lastIndex.value <= typicodeDataLength.value - 10) {
    firstIndex.value += 10;
    lastIndex.value += 10;
    currentUserID.value++;
    filterTypicodeData();
  }
}
function sortDataTitlesAlphabetically(data) {
  if (data) {
    data.sort(function (a, b) {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }
}
watch(isDataFetched, () => {
  filterTypicodeData();
  typicodeDataLength.value = typicodeData.value.length;
  getSelectOptions();
  localStorage.setItem("typicodeData", JSON.stringify(typicodeData.value));
})
watch(currentUserID, () => {
  firstIndex.value = currentUserID.value * 10 - 10;
  lastIndex.value = currentUserID.value * 10 - 1;
  filterTypicodeData()
});
onMounted(() => {
  getDataFromTypicode();
});
</script>
<style lang="scss" scoped>
.json-list {
  background-color: white;
  border-radius: $base-radius;
  max-width: 1000px;
  padding: 15px;
  box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
  -webkit-box-shadow: 8px 8px 24px 0px rgba(66, 68, 90, 1);
  -moz-box-shadow: 8px 8px 24p rgba(66, 68, 90, 1);

  &__list {
    background-color: #f2f3ff;
    border: 1px solid black;
    border-radius: $base-radius;
    height: 400px;
    overflow-y: auto;
    padding: 12px;
    margin-top: 12px;
  }

  &__header {
    font-weight: 700;
    font-size: 18px;
  }

  &__element {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid rgb(213, 213, 213);
  }

  &__id {
    font-weight: 400;
    font-size: 24px;
    margin-right: 16px;
  }
}
</style>
