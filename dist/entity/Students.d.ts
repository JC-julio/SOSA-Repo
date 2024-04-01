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
export default class Student {
    private props;
    constructor(props: StudentDto);
    model: import("mongoose").Model<{
        name?: string;
        className?: string;
        type?: boolean;
        additionalInfo?: string;
        registration?: string;
        organizationId?: string;
    }, {}, {}, {}, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
        name?: string;
        className?: string;
        type?: boolean;
        additionalInfo?: string;
        registration?: string;
        organizationId?: string;
    }>>;
    Post(idOrganization: any): Promise<import("mongoose").Document<unknown, any, {
        name?: string;
        className?: string;
        type?: boolean;
        additionalInfo?: string;
        registration?: string;
        organizationId?: string;
    }> & Omit<{
        name?: string;
        className?: string;
        type?: boolean;
        additionalInfo?: string;
        registration?: string;
        organizationId?: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    static GetOne(studentId: any): Promise<Student>;
    static GetAll(idOrganization: any): Promise<Student[]>;
    static GetByClassName(className: any, idOrganization: any): Promise<{
        name: string;
        type: boolean;
        className: string;
        organizationId: string;
        registration: string;
        id: any;
        additionalInfo: string;
    }[]>;
    static GetByRegistration(registration: any, idOrganization: any): Promise<Student>;
    static Delete(studentId: any): Promise<void>;
    static DeteleByClassName(className: any, idOrganization: any): Promise<void>;
    static updateClass(objectStudent: any): Promise<void>;
    static doUpdate(idOrganization: any, listaAlunos: any): Promise<void>;
    Update(): Promise<void>;
    updateAll(): Promise<void>;
    get name(): String;
    get className(): String;
    get type(): boolean;
    get id(): string;
    get organizationId(): string;
    get registration(): string;
    get additionalInfo(): string;
    set name(name: string);
    set className(className: string);
    set type(type: boolean);
    set registration(registration: string);
    set additionalInfo(additionalInfo: string);
}
export type StudentDto = {
    name: string;
    className: string;
    type: boolean;
    registration: string;
    additionalInfo: string;
    organizationId: string;
    id?: string;
};
