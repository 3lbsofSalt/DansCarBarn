<script setup>
import { reactive, ref } from 'vue';

const users = [
    {
        id: 1,
        email: 'hyrumcoop@gmail.com',
        role: 'Manager',
    },
    {
        id: 2,
        email: 'dan.watson@usu.edu',
        role: 'Customer',
    },
    {
        id: 3,
        email: 'shawn.thorne9@gmail.com',
        role: 'Employee',
    },
];

const roles = ['Manager', 'Employee', 'Customer'];

// state
const showCreateDialog = ref(false);
const showEditDialog = ref(false);
const showDeleteDialog = ref(false);

const createUserForm = reactive({
    email: '',
    password: '',
    role: null,
});

const editUserForm = reactive({
    id: null,
    email: '',
    password: '',
    role: null,
});

const selectedDeleteUser = reactive({ // stores information about the user that was selected for deletion
    id: null,
    email: '',
});

// handlers

const createUser = () => {
    console.log('TODO: Create user with ', createUserForm.email, createUserForm.password, createUserForm.role);
    showCreateDialog.value = false;
};

// open edit user dialog
const editUser = (user) => {
    const { id, email, role } = user;

    editUserForm.id = id;
    editUserForm.email = email;
    editUserForm.password = '';
    editUserForm.role = role;

    // show dialog
    showEditDialog.value = true;
}

// call API to update user
const updateUser = () => {
    console.log('TODO: Update user with ', editUserForm.id, editUserForm.email, editUserForm.password, editUserForm.role);
    showEditDialog.value = false;
}

// select user for deletion
const selectDeleteUser = (user) => {
    const { id, email } = user;

    selectedDeleteUser.id = id;
    selectedDeleteUser.email = email;

    // show dialog
    showDeleteDialog.value = true;
}

// call API to delete user
const deleteUser = () => {
    console.log('TODO: Delete user with ', selectedDeleteUser.id, selectedDeleteUser.email);
    showDeleteDialog.value = false;
}

</script>

<template>
    <div id="manage-users" class="d-flex flex-column">
        <div id="manage-users-header" class="d-flex align-center">
            <h2 class="d-flex flex-grow-1">Users</h2>
            <v-btn icon="mdi-plus" color="secondary" size="small" @click="showCreateDialog=true" />
        </div>

        <v-text-field
            label="Search"
            hide-details="auto"
        />

        <div id="users-list" class="d-flex flex-column">
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">Email</th>
                        <th class="text-left">Role</th>
                        <th class="text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="user in users"
                        :key="user.id"
                    >
                        <td>{{ user.email }}</td>
                        <td>{{ user.role }}</td>
                        <td class="text-right">
                            <v-btn icon="mdi-pencil" variant="flat" size="small" @click="editUser(user)" />
                            <v-btn icon="mdi-delete" variant="flat" size="small" class="text-red" @click="selectDeleteUser(user)" />
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </div>

    <!-- Create User Dialog -->
    <v-dialog v-model="showCreateDialog" width="auto">
        <v-card title="Create User">
            <v-card-text>
                <div class="card-form d-flex flex-column">
                    <v-text-field label="Email" type="email" hide-details="auto" v-model="createUserForm.email" />
                    <v-text-field label="Password" type="password" hide-details="auto" v-model="createUserForm.password" />
                    <v-combobox label="Role" :items="roles" hide-details="auto" v-model="createUserForm.role" />
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="createUser()">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Edit User Dialog -->
    <v-dialog v-model="showEditDialog" width="auto">
        <v-card title="Edit User">
            <v-card-text>
                <div class="card-form d-flex flex-column">
                    <v-text-field label="Email" type="email" hide-details="auto" disabled v-model="editUserForm.email" />
                    <v-text-field label="Password" type="password" hide-details="auto" v-model="editUserForm.password" />
                    <v-combobox label="Role" :items="roles" hide-details="auto" v-model="editUserForm.role" />
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block @click="updateUser()">Update</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- Delete User Dialog -->
    <v-dialog v-model="showDeleteDialog" width="auto">
        <v-card title="Delete User">
            <v-card-text class="confirm-text">
                Are you sure you want to delete the user with email address {{ selectedDeleteUser.email }}?
            </v-card-text>
            <v-card-actions>
                <v-btn color="red" block @click="deleteUser()">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
#manage-users {
    width: 100%;
    gap: 16px;
}

#users-list {
    width: 100%;
    border-top: 1px solid #e0e0e0;
}

.user-item {
    width: 100%;
    padding-left: 16px;
    border-bottom: 1px solid #e0e0e0;
}

.card-form {
    min-width: 350px;
    gap: 16px;
}

.confirm-text {
    max-width: 450px;
}
</style>