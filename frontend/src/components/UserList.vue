<template>
  <div class="container mt-5">
    <h2 class="fw-bold">รายชื่อทั้งหมด</h2>

    <!-- ✅ ส่วนของตัวกรองและเรียงลำดับ -->
    <div class="d-flex justify-content-between my-3">
      <input v-model="searchQuery" type="text" class="form-control w-25" placeholder="🔍 ค้นหา...">
      
      <!-- ✅ กรองตามเพศ -->
      <select v-model="selectedGender" class="form-control w-25">
        <option value="">-- กรองเพศ --</option>
        <option value="ชาย">ชาย</option>
        <option value="หญิง">หญิง</option>
        <option value="อื่น ๆ">อื่น ๆ</option>
      </select>

      <!-- ✅ เรียงลำดับ -->
      <select v-model="sortKey" class="form-control w-25">
        <option value="">-- เรียงลำดับ --</option>
        <option value="firstname">ชื่อ (A-Z)</option>
        <option value="lastname">นามสกุล (A-Z)</option>
        <option value="age">อายุ (น้อย → มาก)</option>
      </select>
      
      <button class="btn btn-primary" @click="openAddUserModal">
        ➕ เพิ่มผู้ใช้
      </button>
    </div>

    <!-- ✅ ตารางแสดงข้อมูล -->
    <div class="table-responsive">
      <table class="table table-bordered text-center">
        <thead class="table-light">
          <tr>
            <th>ชื่อ</th>
            <th>นามสกุล</th>
            <th>อายุ</th>
            <th>เพศ</th>
            <th>ความสนใจ</th>
            <th>รายละเอียด</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in sortedAndFilteredUsers" :key="user.id">
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.age }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.interests }}</td>
            <td>{{ user.description }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-2" @click="editUser(user)">แก้ไข</button>
              <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">ลบ</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ✅ โมดัลเพิ่ม/แก้ไขข้อมูล -->
    <div v-if="showAddUserModal" class="modal d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editingUser ? "แก้ไขข้อมูล" : "เพิ่มผู้ใช้" }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <input v-model="newUser.firstname" type="text" class="form-control mb-2" placeholder="ชื่อ">
            <input v-model="newUser.lastname" type="text" class="form-control mb-2" placeholder="นามสกุล">
            <input v-model="newUser.age" type="number" class="form-control mb-2" placeholder="อายุ">
            <select v-model="newUser.gender" class="form-control mb-2">
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
              <option value="อื่น ๆ">อื่น ๆ</option>
            </select>
            <input v-model="newUser.interests" type="text" class="form-control mb-2" placeholder="ความสนใจ">
            <textarea v-model="newUser.description" class="form-control mb-2" placeholder="รายละเอียด"></textarea>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">ยกเลิก</button>
            <button class="btn btn-success" @click="editingUser ? updateUser() : addUser()">
              {{ editingUser ? "อัปเดต" : "เพิ่ม" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      searchQuery: "",
      selectedGender: "",
      sortKey: "",
      sortDirection: "asc",
      showAddUserModal: false,
      editingUser: null,
      newUser: { firstname: "", lastname: "", age: "", gender: "หญิง", interests: "", description: "" },
    };
  },
  computed: {
    sortedAndFilteredUsers() {
      let filtered = this.users;

      // ✅ กรองตามเพศ
      if (this.selectedGender) {
        filtered = filtered.filter(user => user.gender === this.selectedGender);
      }

      // ✅ ค้นหาจากชื่อ / นามสกุล / อายุ
      if (this.searchQuery) {
        filtered = filtered.filter(user =>
          user.firstname.includes(this.searchQuery) ||
          user.lastname.includes(this.searchQuery) ||
          user.age.toString().includes(this.searchQuery)
        );
      }

      // ✅ เรียงลำดับ
      if (this.sortKey) {
        filtered = [...filtered].sort((a, b) => {
          let result = 0;
          if (a[this.sortKey] < b[this.sortKey]) result = -1;
          if (a[this.sortKey] > b[this.sortKey]) result = 1;
          return this.sortDirection === "asc" ? result : -result;
        });
      }

      return filtered;
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:8000/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    openAddUserModal() {
      this.newUser = { firstname: "", lastname: "", age: "", gender: "หญิง", interests: "", description: "" };
      this.editingUser = null;
      this.showAddUserModal = true;
    },
    async addUser() {
      try {
        await axios.post("http://localhost:8000/users", this.newUser);
        this.fetchUsers();
        this.closeModal();
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },
    async deleteUser(id) {
      if (confirm("คุณต้องการลบผู้ใช้นี้หรือไม่?")) {
        try {
          await axios.delete(`http://localhost:8000/users/${id}`);
          this.fetchUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      }
    },
    editUser(user) {
      this.newUser = { ...user };
      this.editingUser = user.id;
      this.showAddUserModal = true;
    },
    async updateUser() {
      try {
        await axios.put(`http://localhost:8000/users/${this.editingUser}`, this.newUser);
        this.fetchUsers();
        this.closeModal();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    closeModal() {
      this.showAddUserModal = false;
      this.newUser = { firstname: "", lastname: "", age: "", gender: "หญิง", interests: "", description: "" };
      this.editingUser = null;
    }
  }
};
</script>
