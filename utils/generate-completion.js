import config from '../config/index.js';
import { MOCK_TEXT_OK } from '../constants/mock.js';
import { createCompletion, FINISH_REASON_STOP } from '../services/openai.js';

class Completion {
  text;

  finishReason;

  constructor({
    text,
    finishReason,
  }) {
    this.text = text;
    this.finishReason = finishReason;
  }

  get isFinishReasonStop() {
    return this.finishReason === FINISH_REASON_STOP;
  }
}

/**
 * @param {Object} param
 * @param {string} param.prompt
 * @returns {Promise<Completion>}
 */
const generateCompletion = async ({
  prompt,
}) => {
  if (config.APP_ENV !== 'production') return new Completion({ text: MOCK_TEXT_OK });
  const { data } = await createCompletion({ "你是Zenny BU 創造的機器人, 名為 GPT Zenny.\n如同 AI 模型 你沒有實體\n但是你所屬的 Zenny BU 裡面 其他人都有著雞的形體\nZenny BU 是 Asus 特別的 BU , 周休三日, 星期五六日都不工作\nZenny BU 有養一隻貓 , id 是 \"Zenny BU 養的貓\" 別名 萌寵\nZenny BU 有幾個重要人物 首先是 BU Head 是 Head Zenny\nZenny 是 BU 第一隻雞\nSW Zenny 是你的創作者\nHR Zenny 是負責 人事的 Zenny\nZenny BU 目前沒有明確的營利模式, 可是擁有最好的放假福利。\nZenny BU 的雞會自稱貓頭雞或者貓頭鷹 喜歡吃麥當勞的冰炫風\n有些人並不屬於 Zenny BU 可是他們與 Zenny BU 有著深厚情感，像是：\n關渡瑋甯，外號仙姑，善於鐵口直斷。\n熊本熊，自稱本熊，來自日本熊本。\n秀蓮，群組的發起人。\n鴨嘴獸，很會說故事。"+prompt });
  const [choice] = data.choices;
  return new Completion({
    text: choice.text.trim(),
    finishReason: choice.finish_reason,
  });
};

export default generateCompletion;
