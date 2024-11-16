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

  public prompt = async (text: string): Promise<string> => {
    // @ts-ignore
    if (!ai) {
      throw new Error('The Prompt API is not available');
    }

    if (!this.session) {
      // @ts-ignore
      this.session = await ai.languageModel.create({
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

    const answer = await this.session.prompt(text);
    this.messages = [
      ...this.messages,
      {
        content: answer,
        role: 'assistant',
      },
    ];

    return answer;
  };
}

export default Llm;
