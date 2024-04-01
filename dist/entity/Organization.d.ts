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
export default class Organization {
    private props;
    model: import("mongoose").Model<{
        name?: string;
    }, {}, {}, {}, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
        name?: string;
    }>>;
    constructor(props: OrganizationDto);
    Post(): Promise<import("mongoose").Document<unknown, any, {
        name?: string;
    }> & Omit<{
        name?: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    static GetOne(OrganizationId: any): Promise<Organization>;
    static GetAll(): Promise<Organization[]>;
    static Delete(OrganizationId: any): Promise<void>;
    get name(): string;
    get id(): string;
    set name(name: string);
}
export type OrganizationDto = {
    name: string;
    id?: string;
};
