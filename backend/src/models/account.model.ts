import mongoose, { Document, Schema } from "mongoose";
import { ProviderEnum, ProviderEnumType } from "../enums/account-provider.enum";



export interface AccountDocument extends Document {
    provider: ProviderEnumType;
    providerId: string;
    userId: mongoose.Types.ObjectId;
    refreshToken: string;
    tokenExpiry: Date | null;
    createdAt: Date;
    updatedAt: Date;
}


const accountSchema = new Schema<AccountDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    provider: {
        type: String,
        required: true,
        enum: Object.values(ProviderEnum),
    },
    providerId: {
        type: String,
        required: true,
        unique: true
    },
    refreshToken: { type: String, default: null },
    tokenExpiry: { type: Date, default: null }

},
    {
        timestamps: true,
        toJSON: {
            transform: function (_doc, ret) {
                delete ret.refreshToken;

            }
        }
    });

export default mongoose.model<AccountDocument>("Account",
    accountSchema);