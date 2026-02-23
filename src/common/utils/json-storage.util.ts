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

    async findById(Id: string): Promise<T | undefined> {
        return this.data.find(item => item.id === Id);
    }

    async create(item: T): Promise<T> {
        this.data.push(item);
        await this.save();
        return item;
    }

    async update(id: string, updates: Partial<T>): Promise<T | undefined> {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) {
          return undefined;
        }
        this.data[index] = { ...this.data[index], ...updates };
        await this.save();
        return this.data[index];
      }

    async delete(id: string): Promise<boolean>{
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1){
            return false;
        }
        this.data.splice(index, 1);
        await this.save();
        return true;
    }

    async findByCondition(predicate: (item: T) => boolean): Promise<T[]> {
        return this.data.filter(predicate);
    }

    async deleteByConditon(predicate: (item: T) => boolean): Promise<number>{
        const initialLength = this.data.length;
        this.data = this.data.filter(item => !predicate(item));
        const deleteCount = initialLength - this.data.length;

        if(deleteCount > 0){
            await this.save
        }
        return deleteCount;
    }
}
