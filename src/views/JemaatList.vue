<template>
  <div class="ReportBulanan">
    <h2 class="mt-4 mb-2">Database User</h2>
    <div class="row justify-content-md-center">
      <div class="col col-lg-8 justify-content-md-center mt-3">
        <h3>Daftar Jemaat</h3>
        <button
          type="button"
          class="btn btn-primary mb-2"
          @click.prevent="showAddJemaat()"
        >Tambahkan Jemaat</button>
        <div class="modal fade" id="jemaatForm" role="dialog">
          <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-body">
                <form @submit.prevent="jemaatStatus ? editJemaat() : addJemaat()">
                  <div class="col-sm">
                    <label class="my-1 mr-2" for="Username">Nama Jemaat</label>
                    <div class="input-group">
                      <input type="text" class="form-control" v-model="namaJemaat" />
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary mt-3">Tambahkan</button>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover table-bordered" id="pemasukanTable">
          <thead>
            <tr>
              <th scope="col">Nama Jemaat</th>
              <th scope="col">Jumlah User</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="jem in this.jemaatList" :key="jem.id">
              <td>{{jem.namaJemaat}}</td>
              <td id="uang">{{jem.Users.length}}</td>
            </tr>
          </tbody>
        </table>
        <h3>Daftar User</h3>
        <button
          type="button"
          class="btn btn-primary mb-2"
          data-toggle="modal"
          data-target="#addUser"
        >Tambahkan User</button>
        <div
          class="modal fade"
          id="addUser"
          data-backdrop="static"
          data-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Tambah User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="addUser()">
                  <label class="my-1 mr-2" for="MataAnggaran">Jemaat</label>
                  <div class="input-group">
                    <select class="form-control" v-model="JemaatId" required>
                      <option
                        v-for="jemaat in this.jemaatList"
                        :key="jemaat.id"
                        :value="jemaat.id"
                      >{{jemaat.namaJemaat}}</option>
                    </select>
                  </div>

                  <label class="my-1 mr-2" for="Username">Username</label>
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="username" />
                  </div>
                  <label class="my-1 mr-2" for="Username">password</label>
                  <div class="input-group">
                    <input type="text" class="form-control" v-model="password" />
                  </div>
                  <label class="my-1 mr-2" for="role">Role</label>
                  <div class="input-group">
                    <select class="form-control" v-model="role" required>
                      <option v-for="role in this.roleList" :key="role" :value="role">{{role}}</option>
                    </select>
                  </div>

                  <button type="submit" class="btn btn-primary mt-3">Tambahkan</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover table-bordered" id="pemasukanTable">
          <thead>
            <tr>
              <th scope="col">Nama User</th>
              <th scope="col">Jemaat</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in this.userList" :key="user.id">
              <td>{{user.username}}</td>
              <td id="uang">{{user.Jemaat.namaJemaat}}</td>
              <td id="uang">{{user.role}}</td>
              <td id="edit">
                <a @click.prevent="confirmReset(user.id)">
                  <i class="fas fa-edit" title="Reset Password"></i>
                </a>
                <a @click.prevent="confirmDelete(user.id)">
                  <i class="fas fa-trash-alt ml-2" title="Hapus User"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../API/axios";
import Swal from "sweetalert2";
import moment from "moment";
export default {
  name: "ReportBulanan",
  data() {
    return {
      jemaatStatus: false,
      jemaatList: [],
      userList: [],
      namaJemaat: "",
      JemaatId: 0,
      username: "",
      password: "",
      role: "",
      roleList: ["bendahara", "anggota"]
    };
  },

  methods: {
    showAddJemaat() {
      $("#jemaatForm").modal("show");
      this.jemaatStatus = false;
      this.namaJemaat = "";
    },

    getJemaat() {
      return axios
        .get("/user/jemaat", {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(({ data }) => {
          this.jemaatList = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUser() {
      return axios
        .get("/user", {
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(data => {
          this.userList = data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addJemaat() {
      return axios
        .post(
          "/user/jemaat",
          {
            namaJemaat: this.namaJemaat
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          $("#jemaatForm").modal("hide");

          // localStorage.getItem("access_token");
          Swal.fire("Terima Kasih", "Jemaat ditambahkan", "success");
          this.getJemaat();
          this.getJemaat();
          this.getJemaat();
        })
        .catch(err => {
          Swal.fire("Maaf", "periksa kembali data anda", "error");
        });
    },
    addUser() {
      return axios
        .post(
          "/user/register",
          {
            username: this.username,
            password: this.password,
            role: this.role,
            JemaatId: this.JemaatId
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token")
            }
          }
        )
        .then(data => {
          localStorage.getItem("access_token");
          $("#addUser").modal("hide");

          Swal.fire("Terima Kasih", "Jemaat ditambahkan", "success");
          this.getUser();
          this.getUser();
          this.getUser();
        })
        .catch(err => {
          Swal.fire("Maaf", "periksa kembali data anda", "error");
        });
    },
    deleteUser(id) {
      return axios.delete(`/user/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      });
    },
    resetPass(id) {
      return axios.patch(`/user/password/reset/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      });
    },
    confirmDelete(id) {
      Swal.fire({
        title: "Yakin?",
        text: "Yakin Dihapus ? ",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Hapus!!"
      }).then(result => {
        if (result.isConfirmed) {
          this.deleteUser(id);
          Swal.fire("Deleted!", "User Berhasil Dihapus", "success");
          this.getUser();
        } else {
          Swal.fire("Ok", "Proses anda berhasil dibatalkan", "error");
        }
      });
    },
    confirmReset(id) {
      Swal.fire({
        title: "Reset Password",
        text: "Yakin Reset Password? ",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Reset"
      }).then(result => {
        if (result.isConfirmed) {
          this.resetPass(id);
          Swal.fire("Reset!", "Data Berhasil Diubah", "success");
          this.getUser();
        } else {
          Swal.fire("Ok", "Proses anda berhasil dibatalkan", "error");
        }
      });
    }
  },
  created() {
    this.getJemaat();
    this.getUser();
  }
};
</script>

<style scoped>
.ReportBulanan {
  width: 85vw;
}
td#edit {
  text-align: center;
}
thead tr {
  /* background-color: #1b9aaa; */
  color: #0040b8;
  font-weight: normal;
  font-size: 14px;
}
#uang {
  text-align: right;
}
td,
th {
  font-size: 14px;
  padding: 5px 2px;
}
th {
  text-align: center;
}
td {
  text-align: left;
}
#head {
  text-align-last: left;
}
@media screen and (max-width: 800px) {
  .ReportBulanan {
    padding-left: 10px;
  }
}
</style>