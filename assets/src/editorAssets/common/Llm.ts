export type CompletionMessage = {
  content: string;
  role: 'system' | 'user' | 'assistant';
  error?: string;
};

class Llm {
  private session: any;
  public messages: Array<CompletionMessage> = [];
  private systemPrompt: string;

  constructor(systemPrompt: string) {
    this.systemPrompt = systemPrompt;
  }

  public promptStreaming = async (
    text: string,
    callback: (answer: string) => void = () => {}
  ): Promise<string> => {
    // @ts-ignore
    if (!window?.ai?.languageModel) {
      throw new Error('The Prompt API is not available');
    }

    if (!this.session) {
      // @ts-ignore
      this.session = await window.ai.languageModel.create({
        systemPrompt: this.systemPrompt,
      });
      this.messages = [
        {
          content: this.systemPrompt,
          role: 'system',
        },
      ];
    }

    this.messages = [
      ...this.messages,
      {
        content: text,
        role: 'user',
      },
    ];

    const stream = this.session.promptStreaming(text);
    let answer = '';
    for await (const chunk of stream) {
      answer = chunk;
      callback(answer);
    }
    this.messages = [
      ...this.messages,
      {
        content: answer,
        role: 'assistant',
      },
    ];

    return answer;
  };

  public prompt = async (text: string): Promise<string> =>
    this.promptStreaming(text);
}

export default Llm;
