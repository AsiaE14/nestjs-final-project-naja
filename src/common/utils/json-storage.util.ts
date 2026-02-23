import * as fs from 'fs/promises';
import * as path from 'path';

export class JsonStroage<T extends {id: String} >{
    private filePath: string;
    private data: T[] = [];

    constructor(fileName: string){
        this.filePath = path.join(process.cwd(), 'data', fileName);
        this.initialize();
    }

    private async initialize(): Promise<void>{
        try{
            const dir = path.dirname(this.filePath);
            await fs.mkdir(dir, {recursive: true});

        try{
            const fileContent = await fs.readFile(this.filePath, 'utf-8');
            this.data = JSON.parse(fileContent)
        }catch{
            this.data = [];
        }   
    }catch(error){
        throw new Error('Failed to storage ${error}' )
    }
 }
    
    private async save(): Promise<void>{
        try{
            await fs.writeFile(
                this.filePath,
                JSON.stringify(this.data, null, 2), 'utf-8');
        }catch (error){
            throw new Error('Failed to save data ${error')
        }
    }

    async findAll (): Promise<T[]> {
        return [...this.data];
    }
}