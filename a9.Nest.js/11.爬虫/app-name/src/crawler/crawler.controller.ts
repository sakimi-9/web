import { Controller, Get } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs'; // 确保导入fs模块
import * as path from 'path'; // 同时导入path模块用于处理路径

@Controller('crawler')
export class CrawlerController {
    @Get('images')
    async crawlImages(): Promise<void> {
        const url = 'https://www.52cos.cc/15630.html';//该网站设置了反爬，爬取的图片有问题
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);

            // 解析图片链接
            const images: string[] = [];
            $('img').each((i, el) => {
                let src = $(el).attr('src') ?? ''; // 使用空字符串作为默认值
                if (src && !src.startsWith('http')) { // 检查src是否为空且不是以http开头
                    src = new URL(src, url).href; // 仅当src有效时才尝试创建URL
                }
                if (src) {
                    images.push(src);
                }
            });

            // 下载图片
            for (const imgSrc of images) {
                await this.downloadImage(imgSrc);
            }

            console.log('All images downloaded successfully.');
        } catch (error) {
            console.error('Error occurred:', error.message);
        }
    }

    private async downloadImage(url: string): Promise<void> {
        try {
            const imagesDir = path.join(__dirname, '..', 'images'); // 使用相对项目根目录的路径
            if (!fs.existsSync(imagesDir)) {
                fs.mkdirSync(imagesDir, { recursive: true });
            }

            const response = await axios({
                method: 'get',
                url,
                responseType: 'stream',
            });

            // 使用path模块来安全地组合路径
            const fileName = path.basename(new URL(url).pathname);
            const filePath = path.join(imagesDir, fileName);

            const writer = fs.createWriteStream(filePath); // 创建写入流

            response.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
        } catch (error) {
            console.error(`Failed to download image ${url}:`, error.message);
        }
    }
}