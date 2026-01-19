const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
    // جلب المفتاح السري من إعدادات Netlify لضمان الأمان
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        // استقبال السؤال من واجهة الموقع
        const body = JSON.parse(event.body);
        const userPrompt = body.prompt;

        // طلب الإجابة من الذكاء الاصطناعي
        const result = await model.generateContent(userPrompt);
        const response = await result.response;

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: response.text() }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "فشل في جلب البيانات، تأكد من الـ API_KEY" }),
        };
    }
};