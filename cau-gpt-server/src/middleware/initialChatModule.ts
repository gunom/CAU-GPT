import { RecursiveCharacterTextSplitter, CharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import {
    VectorStoreToolkit,
    createVectorStoreAgent,
    VectorStoreInfo,
    AgentExecutor,
} from "langchain/agents";
import { OpenAI } from "langchain";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

let chatModuleData: {
    agent: AgentExecutor,
    llm: OpenAI,
};

const initializeChatModule = async () => {

    const llm = new OpenAI({
        maxConcurrency: 10,
        temperature: 0,
    })

    const embeddings = new OpenAIEmbeddings();

    const text = fs.readFileSync("중앙대학교 정보.txt", "utf8");

    const textSplitter = new RecursiveCharacterTextSplitter();
    const docs = await textSplitter.createDocuments([text]);

    const historyFile = fs.readFileSync("중앙대학교 역사.txt", "utf8");
    const historyDocs = await textSplitter.createDocuments([historyFile]);
    docs.push(...historyDocs);
    const store = await HNSWLib.fromDocuments(docs, embeddings)

    const vectorStoreInfo: VectorStoreInfo = {
        name: "Chung-ang_univ",
        description: "information of Chung-ang univ",
        vectorStore: store,
    }

    const toolkit = new VectorStoreToolkit(vectorStoreInfo, llm)
    const agent = createVectorStoreAgent(llm, toolkit)

    chatModuleData = {
        agent,
        llm,
    };

    return chatModuleData;
};

const getEnglishResponse = async (question: string) => {
    const chat = new ChatOpenAI({
        temperature: 0,
    });

    const response = await chat.call([
        new SystemChatMessage(
            "your response must be \"INPUT: {to be translate},OUTPUT:{translated}\""
        ),
        new HumanChatMessage(
            "translate this to English this sentence \"" + question + "\" and give me only translated output. if input already english, just give me input.",
        )
    ]);

    return (response.text.split("OUTPUT:")[1] + "\n don't make up.");
}

const getKoreanResponse = async (answer: string) => {
    const chat = new ChatOpenAI({
        temperature: 0.8,
    });

    const response = await chat.call([
        new SystemChatMessage(
            "You have to translate English input to Korean. you only give me Korean output."
        ),
        new SystemChatMessage(
            "and Chung-ang or Chungang or similar word must translated \"중앙\"."
        ),
        new SystemChatMessage(
            "black stone must translated \"흑석\""
        ),
        new HumanChatMessage(
            answer,
        )
    ]);

    return response;
}

const refineResponse = async (answer: string) => {
    const response = answer.replace(/충암/g, "중앙").replace(/충앙/g, "중앙")
        .replace(/청안/g, "중앙")
        .replace(/정암/g, "중앙")
        .replace(/중앙/g, "중앙")
        .replace(/정앙/g, "중앙")
        .replace(/중안/g, "흑석");

    return response;

}

const getAgent = () => {
    return chatModuleData.agent;
};

const getResultModel = () => {
    return chatModuleData.llm;
};

export {
    initializeChatModule,
    getAgent,
    getResultModel,
    getEnglishResponse,
    getKoreanResponse,
    refineResponse,
};
