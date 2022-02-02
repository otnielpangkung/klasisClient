<template>
  <div class="chartJs">
    <canvas id="my-chart" width="500" height="300"></canvas>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  methods: {}
};
</script>

<style scoped>
#opLogo {
  width: 60px;
  justify-self: center;
}
p {
  font-size: 30px;
}
#copyright {
  margin-top: 5px;
  font-size: 12px;
  justify-self: center;
}
.LoginPage {
  min-width: 100vw;
  display: grid;
  align-content: center;
  justify-content: center;
  min-height: 80vh;
  justify-content: center;
  justify-items: center;
  /* align-items: center; */
  /* background-color: aqua; */
}
.LoginPage img {
  max-width: 200px;
}
.LoginPage form {
  display: grid;
  margin-top: 10px;
}

form input {
  /* background-color: #f2f2f2; */
  margin-top: 5px;
  border: none;
  text-align: center;
}

form input {
  font-size: 18px;
  color: rgb(10, 0, 0);
}

form button {
  margin-top: 20px;
  font-size: 18px;
}
</style>
