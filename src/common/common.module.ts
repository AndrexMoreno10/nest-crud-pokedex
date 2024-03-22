import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
    providers: [AxiosAdapter],
    imports: [],
    exports: [AxiosAdapter]
})
export class CommonModule { }
