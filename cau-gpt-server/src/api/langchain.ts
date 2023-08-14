import { getAgent, getEnglishResponse, getKoreanResponse, refineResponse } from "../middleware/initialChatModule";

const question = async (question: string) => {
    const agent = getAgent();

    const englishQuestion = await getEnglishResponse(question)

    console.log("englishQuestion: ", englishQuestion)

    console.log("start call")
    const startTime = new Date().getTime();

    const result = await agent.call({ input: englishQuestion })

    const koreanResult = await getKoreanResponse(result.output)

    const endTime = new Date().getTime();

    console.log("time: ", endTime - startTime, "ms")
    const refineResult = await refineResponse(koreanResult.text)
    return refineResult;
}

export default {
    question
};