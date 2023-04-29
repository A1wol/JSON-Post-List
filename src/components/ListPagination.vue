<template>
  <div class="list-pagination">
    <div class="list-pagination__title">
      JSON List
      <img :src="listBox" />
    </div>
    <div class="list-pagination__pagination">
      <div
        class="list-pagination__arrow"
        :class="[
          isPrevButtonVisible ? '' : 'list-pagination__arrow--invisible',
        ]"
        @click="emit('prev')"
      >
        <img :src="pagePrev" />
        <div>Previous</div>
      </div>
      <div class="list-pagination__current-userid">
        <select
          :value="modelValue"
          @change="$emit('update:modelValue', $event.target.value)"
        >
          <option disabled>{{ props.userID }}</option>
          <option v-for="option in options" :value="option" :key="option.id">
            {{ option }}
          </option>
        </select>
        <div class="select_arrow"></div>
      </div>
      <div
        class="list-pagination__arrow"
        :class="[
          isNextButtonVisible ? '' : 'list-pagination__arrow--invisible',
        ]"
        @click="emit('next')"
      >
        <img :src="pageNext" />
        <div>Next</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineEmits, defineProps } from "vue";
import pageNext from "@/assets/svg/page-next-outline.svg";
import pagePrev from "@/assets/svg/page-previous-outline.svg";
import listBox from "@/assets/svg/list-box-outline.svg";
const emit = defineEmits(["prev", "next", "update:modelValue"]);
const props = defineProps([
  "userID",
  "modelValue",
  "options",
  "isPrevButtonVisible",
  "isNextButtonVisible",
]);
</script>
<style scoped lang="scss">
.list-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 35px;
    height: 35px;
  }

  &__pagination {
    display: flex;
  }

  &__title {
    font-weight: 700;
    align-items: center;
    display: flex;
    font-size: 36px;
  }

  &__arrow {
    @include flexCenter(column);
    min-width: 100px;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease-in-out;

    &--invisible {
      visibility: hidden;
    }

    &:hover {
      opacity: 1;
    }
  }

  &__current-userid {
    @include flexCenter(row);

    select {
      @include flexCenter(row);
      text-align: center;
      cursor: pointer;
      padding: 12px;
      border: 1px solid #000000;
      border-radius: $base-radius;
      font-size: 18px;
      background: white;
      color: black;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
    }

    .select_arrow {
      display: none;
    }
  }
}

@media (max-width: 600px) {
  .list-pagination {
    &__title {
      font-size: 22px;
    }

    &__arrow {
      min-width: 70px;
    }
  }
}

@media (max-width: 400px) {
  .list-pagination {
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
