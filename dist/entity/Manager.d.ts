/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
export default class Manager {
    private props;
    model: import("mongoose").Model<{
        name?: string;
        type?: string;
        organizationId?: string;
        password?: string;
    }, {}, {}, {}, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
        name?: string;
        type?: string;
        organizationId?: string;
        password?: string;
    }>>;
    TokenDB: import("mongoose").Model<{
        bannedToken?: string;
    }, {}, {}, {}, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
        bannedToken?: string;
    }>>;
    constructor(props: ManagerDto);
    Post(): Promise<import("mongoose").Document<unknown, any, {
        name?: string;
        type?: string;
        organizationId?: string;
        password?: string;
    }> & Omit<{
        name?: string;
        type?: string;
        organizationId?: string;
        password?: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    static GetOne(managerId: any): Promise<Manager>;
    static GetAll(idOrganization: any): Promise<Manager[]>;
    static Delete(managerId: any): Promise<void>;
    Update(): Promise<void>;
    static Login(user: string, password: string): Promise<{
        token: any;
        manager: {
            name: string;
            type: string;
            id: any;
            organizationId: string;
        };
    }>;
    static logout(Token: String): Promise<import("mongoose").Document<unknown, any, {
        bannedToken?: string;
    }> & Omit<{
        bannedToken?: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    get name(): string;
    get password(): string;
    get type(): string;
    get id(): string;
    get organizationId(): string;
    set name(name: string);
    set password(password: string);
    set type(type: string);
}
export type ManagerDto = {
    name: string;
    password?: string;
    type: string;
    organizationId: string;
    id?: string;
};
