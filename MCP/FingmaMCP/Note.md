clone了代码库，但是在如何本地运行暂时没有弄明白

好在 SSE模式运行弄明白了


1.命令行运行                             //Figma-key
npx figma-developer-mcp --figma-api-key=figd_eu2LYeEFx7RjH7k5fr6E_uChVL0u-nHPeXtJAREQ

2.Cursor的MCP配置  SSE模式
{
    "mcpServers": {
        "server-name": {
            "url": "http://localhost:3333/sse",
            "env": {
                "API_KEY": "figd_eu2LYeEFx7RjH7k5fr6E_uChVL0u-nHPeXtJAREQ"
            }
        }
    }
}

3.MCP服务连通 进行使用
 运作方式
 在代理模式下打开 Cursor 的 Composer(旧) Agent(新)。
 粘贴指向 Figma 文件、框架或组的链接。
 让 Cursor 对 Figma 文件执行一些作，例如实现一个设计。
 Cursor 将从 Figma 获取相关元数据并使用它来编写您的代码。