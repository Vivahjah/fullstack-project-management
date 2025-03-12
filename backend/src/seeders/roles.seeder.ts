import mongoose from "mongoose"
import "dotenv/config";
import connectDatabase from "../config/database.config"
import RoleModel from "../models/roles-permission.model"
import { RolePermissions } from "../utils/roles-permissions"

const seedroles = async () => {
    console.log("Seeding roles started...")

    try {
        await connectDatabase()
        const session = await mongoose.startSession()
        session.startTransaction()

        console.log("clearing existing roles....");
        await RoleModel.deleteMany({}, { session })

        for (const roleName in RolePermissions) {
            const role = roleName as keyof typeof RolePermissions;
            const permissions = RolePermissions[role];

            //checking if the role 
            const existingRole = await RoleModel.findOne(
                { name: role }
            ).session(session)

            if (!existingRole) {
                const newRole = new RoleModel({
                    name: role,
                    permissions: permissions
                });
                await newRole.save({ session })
                console.log(`Role ${role} added with permissions.`);
            } else {
                console.log(`Role ${role} already exists.`);
            }
        }
        await session.commitTransaction()
        console.log("Transaction committed");
        session.endSession()

    } catch (error) {
        console.error("Seeding roles failed:", error)

    }
}


seedroles()
    .catch(error =>
        console.error("Error running seed script", error))