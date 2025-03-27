<template>
  <div class="relative">
    <!-- ใช้ container-fluid สำหรับทำให้ navbar ครอบคลุมเต็มหน้าจอ -->
    <div class="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg fixed-top">
        <a class="navbar-brand" href="#">
          <img src="https://www.logoai.com/oss/icons/2021/12/02/SU8HhT2n6tL-p-_.png" alt="Logo" class="logo">
          <span class="logo-text">My Company</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <!-- เพิ่มการแสดง UserList -->
    <div class="content-container">
      <UserList />
    </div>
  </div>
</template>

<script>
// Import คอมโพเนนต์ที่ใช้งาน
import UserList from './components/UserList.vue';
export default {
  components: {
    UserList
  }
};
</script>
