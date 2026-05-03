import { Response } from 'express';
export declare const createTask: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getTasks: (req: any, res: Response) => Promise<void>;
export declare const updateTask: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteTask: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=taskController.d.ts.map