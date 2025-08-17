---
layout: post
title: "Understanding NLP systems evaluation: A Bird Eye View"
date: 2024-08-14 12:30:00
categories:
  - machine learning
  - natural language processing
  - large language models
  - multimodal large language models
  - metrics
---

[Natural Language Processing (NLP)](https://en.wikipedia.org/wiki/Natural_language_processing) is a field interested in systems interacting with human language.
Its tasks are divided into Natural Language Understanding (NLU) and Natural Language Generation (NLG).
In this article, I explain the evaluation metrics developed to assess the quality of NLG models and the intuition behind them.
If you are interested in NLU tasks, which are classification applications by nature, you may check my article: [Classification Metrics: A Cheatsheet](https://mohamed-e-fayed.github.io/docs/machine%20learning/classification/metrics/2024/08/14/classification-metrics.html).

For the sake of understanding the whole landscape, I will focus on Machine Translation problem as an example for NLG task, and refer to other problems as well.
If you have interest in Large Language Models and evaluating its output, you may proceed to the below section of [Evaluating Instruction Fine-tuning](#eval-llm).

Note: I believe that every researcher has to understand the reason why we needed an metric and the design choices lead to each one.
This is crucial since it significantly affects the output of your system and effectiveness of your research overall.
So, you will find me digging into details for a good reason.

## <a id="background">Background</a>
[Machine Translation (MT)](https://en.wikipedia.org/wiki/Machine_translation) is one of the [oldest problems](https://en.wikipedia.org/wiki/History_of_machine_translation) in [artificial intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence).
It is concerned with automatically converting text from one human language to another.
For example, you want to translate Chinese sentence into English or vice versa.
This should be done automatically using computers.

The part of interest of this story starts in 2002, by the introduction of [BLEU: a Method for Automatic Evaluation of Machine Translation](#papineni2002).
If you have Chinese sentence, English translation, and model output in English, you may compare the generated output with reference translation (which is English in this case).
This algorithm has been the de facto metric to compare among [MT](https://en.wikipedia.org/wiki/Machine_translation) systems till the introduction of first neural metric of [BERT Score](#zhang2019).
Attention has shifted towards neural networks as metrics since they exhibit higher correlations with human judgements for machine translation systems.
Since then, many other neural metrics have introduced in MT, e.g. [Comet](#rei2020) and [] [MetricX](#juraska2023) and other NLG tasks.

## ## <a id="metrics-classification">Metrics Classification</a>
I divide the metrics into three categories:

1. Algorithmic: You use a predefined algorithm to compute score.
This heavily relies on the existence of some reference text.
1. Neural: You use neural network to assess the quality of your system.
This is usually used when algorithmic metrics are not good indicators any more.
1. Large Language Modelas a judge: As appears from its name, it is about using Large Language Models (LLMs) to assess the quality of other systems.
They are used in assessing the quality of other LLMs in replying to user queries.

To illustrate this point further, let's consider the below table for interpreting the BLEU score.
It is copied from [this article](https://cloud.google.com/translate/docs/advanced/automl-evaluate) from Google Cloud about evaluating models.

| BLEU Score | Interpretation |
| :--- | :--- |
| < 10 | Almost useless |
| 10 - 19 | Hard to get the gist |
| 20 - 29 | The gist is clear, but has significant grammatical errors |
| 30 - 40 | Understandable to good translations |
| 40 - 50 | High quality translations |
| 50 - 60 | Very high quality, adequate, and fluent translations |
| > 60 | Quality often better than human |

As it may be obvious from the table, BLEU score is meaningful till you reach 50s and beyond.
Above 60, it is very comparable to humans.
However, [(Freitag et al, 2021)](#freitag2021) has shown that crowd workers may not differentiate between human and machine translation.
Hence, necessitates the need for professional translators to assess the quality of recent MT systems.

### <a id="algorithmic-metrics">Algorithmic Metrics</a>
The first category is algorithmic metrics.
Given model output and reference output, compute score indicating how relevant is the prediction to ground truth.

Here is a list of algorithmic metrics and tasks in which they are used:

* [BLEU](#papeneni2002): commonly used in MT and Text Summarization.
Since it has parameters that controls the computed scores, [(Post et al, 2018)](#post2018) introduced sacrebleu implementation to fix those parameters for more fair comparison among papers.
* ChrF++: recently used in MT.
It has been especially promoted in [No Language Left Behind](https://arxiv.org/abs/2207.04672) paper.
* ROUGE: Mostly used in text summarization, and can be used in MT.
It has variances including: ROUGE-S and ROUGE-L.

### <a id="neural-metrics">Neural Metrics</a>
Deep neural networks has been trained to score the quality of generations on given task.
Since algorithmic metrics fall short when there is no given reference or there might be a very large number of possible references, deep neural networks come to the rescue.
Example models include:

1. Comet and Cometkiwi: the first neural models to assess the quality of outputs of MT systems.
Some other neural metrics participated in the competition in the following years are MetricX and XTOWER.
1. LLM as a judge: Due to the fact that LLMs are used to reply to user queries, where there is no single correct answer, researchers studied the usage of LLMs to judge LLMs outputs.

## <a id="eval-llm">Evaluating Large Language Models</a>

## <a id="references">References</a>

1. <a id="papineni2002">Papineni, K., Roukos, S., Ward, T., & Zhu, W. J. (2002, July). Bleu: a method for automatic evaluation of machine translation. In Proceedings of the 40th annual meeting of the Association for Computational Linguistics (pp. 311-318). unselected</a>
1. <a id="post2018">Post, M. (2018). A call for clarity in reporting BLEU scores. arXiv preprint arXiv:1804.08771.</a>
1. <a id="rei2020">Rei, R., Stewart, C., Farinha, A. C., & Lavie, A. (2020). COMET: A neural framework for MT evaluation. arXiv preprint arXiv:2009.09025. unselected</a>

1. <a id="juraska2023">Juraska, J., Finkelstein, M., Deutsch, D., Siddhant, A., Mirzazadeh, M., & Freitag, M. (2023). MetricX-23: The Google Submission to the WMT 2023 Metrics Shared Task. In P. Koehn, B. Haddow, T. Kocmi, & C. Monz (Eds.), Proceedings of the Eighth Conference on Machine Translation (pp. 756–767). Association for Computational Linguistics. https://doi.org/10.18653/v1/2023.wmt-1.63</a>
1. <a id="freitag2021">Freitag, M., Foster, G., Grangier, D., Ratnakar, V., Tan, Q., & Macherey, W. (2021). Experts, errors, and context: A large-scale study of human evaluation for machine translation. Transactions of the Association for Computational Linguistics, 9, 1460-1474. unselected</a>
1. <a id="nllb2002">Team, N. L. L. B., Costa-Jussà, M. R., Cross, J., Çelebi, O., Elbayad, M., Heafield, K., ... & Wang, J. (2022). No language left behind: Scaling human-centered machine translation. arXiv preprint arXiv:2207.04672. unselected</a>
1. [ROUGE: A Package for Automatic Evaluation of Summaries](https://aclanthology.org/W04-1013/) (Lin, 2004)</a>
1. <a id="zhang2019">Zhang, T., Kishore, V., Wu, F., Weinberger, K. Q., & Artzi, Y. (2019). Bertscore: Evaluating text generation with bert. arXiv preprint arXiv:1904.09675. column 2</a>
