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
export default class Exits {
    private props;
    model: import("mongoose").Model<{
        organizationId?: string;
        idStudent?: string;
        idWorker?: string;
        time?: number;
        observes?: string;
        dateExit?: Date;
        confirmExit?: string;
    }, {}, {}, {}, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
        organizationId?: string;
        idStudent?: string;
        idWorker?: string;
        time?: number;
        observes?: string;
        dateExit?: Date;
        confirmExit?: string;
    }>>;
    constructor(props: ExitsDto);
    Post(): Promise<import("mongoose").Document<unknown, any, {
        organizationId?: string;
        idStudent?: string;
        idWorker?: string;
        time?: number;
        observes?: string;
        dateExit?: Date;
        confirmExit?: string;
    }> & Omit<{
        organizationId?: string;
        idStudent?: string;
        idWorker?: string;
        time?: number;
        observes?: string;
        dateExit?: Date;
        confirmExit?: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    static GetOne(ExitID: any): Promise<Exits>;
    static GetExits(DateInit: Date, DateEnd: Date, idOrganization: String): Promise<{
        idStudent: string;
        idWorker: string;
        organizationId: string;
        time: number;
        observes: string;
        dateExit: Date;
        confirmExit: string;
        id: any;
    }[]>;
    static GetAll(idOrganization: any): Promise<{
        idStudent: string;
        idWorker: string;
        organizationId: string;
        time: number;
        observes: string;
        dateExit: Date;
        confirmExit: string;
        id: any;
    }[]>;
    static DeleteAll(idOrganization: any): Promise<void>;
    Update(): Promise<string>;
    get idStudent(): string;
    get idWorker(): string;
    get time(): number;
    get observes(): string;
    get dateExit(): Date;
    get id(): string;
    get confirmExit(): string;
    get organizationId(): string;
    set idStudent(idStudent: string);
    set idWorker(idWorker: string);
    set time(time: number);
    set observes(observes: string);
    set dateExit(DateExit: Date);
    set confirmExit(confirmExit: string);
}
export type ExitsDto = {
    idStudent: string;
    idWorker: string;
    organizationId: string;
    time?: number;
    observes: string;
    dateExit: Date;
    confirmExit?: string;
    id?: string;
};
