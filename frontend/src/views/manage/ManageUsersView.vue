<script setup>

const users = [
    {
        email: 'hyrumcoop@gmail.com',
        role: 'Manager',
    },
    {
        email: 'dan.watson@usu.edu',
        role: 'Customer',
    },
    {
        email: 'shawn.thorne9@gmail.com',
        role: 'Employee',
    },
];

</script>

<template>
    <div id="manage-users" class="d-flex flex-column">
        <div id="manage-users-header" class="d-flex align-center">
            <h2 class="d-flex flex-grow-1">Users</h2>
            <v-btn icon="mdi-plus" color="secondary" size="small" />
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
                        :key="user.email"
                    >
                        <td>{{ user.email }}</td>
                        <td>{{ user.role }}</td>
                        <td class="text-right">
                            <v-btn icon="mdi-pencil" variant="flat" size="small" />
                            <v-btn icon="mdi-delete" variant="flat" size="small" class="text-red" />
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </div>
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
</style>