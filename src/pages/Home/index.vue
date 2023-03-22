<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <YouLike />
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import Rank from "@/pages/Home/Rank";
import YouLike from "@/pages/Home/YouLike";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";
export default {
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    YouLike,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch("home/getFloors");
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
};
</script>

<style>
</style>