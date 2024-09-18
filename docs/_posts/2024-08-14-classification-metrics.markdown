---
layout: post
title: "Classification Metrics: An Accessible Cheat Sheet"
date: 2024-08-14 12:30:00
categories:
  - machine learning
  - classification
  - metrics
---

Usually, I get confused about the calculations of classification metrics and their definitions.
Moreover, searching for an accessible version is very time consuming process.
So, I decided to write down this cheat sheet to remind myself of every detail instead of doing search each time.
I hope it would be useful for you as well.

Note: It is an in progress work, with TODOs. If you find anything missing, or incorrect, please [email me](mailto:mohamed.fayed@gatech.edu)

## Definitions

Here are some definition to use in this cheat sheet.

* Model or Machine Learning System or ML System are all used interchangeably.
* Ground truth or Labels refer to annotated value in the dataset itself.
* Prediction is referring to Machine Learning System's output.

Note: In binary classification, we may build a model of single output in range of [0-1] and makde decision based on a tunable threshold.
Another approach is to create a single model that has two outputs (1 output for each class) per single input.
At this approach, we usually convert the outputs into probabilities and select the class of higher probability.

* True Positive: The model predicted postivie and the correct label is positive.
* True Negative: The ML system predicted negative and the correct label is negative.
* False Positive: the model predicted positive, but the correct label is negative.
* False Negative: the model predicted negative, but the correct label is positive.

* True/False is representative of whether prediction matches the ground truth.
* Positive/Negative is the class predicted by the model.

## Data To Use

I will use the below variables in calculating all metrics.
I include the outputs to make it easy for you to verify when calculated by hand.

```python
scores = [0.9, 0.57, 0.86, 0.77, 0.99, 0.64, 0.87, 0.41, 0.45]
predictions = [1, 1, 1, 1, 1, 1, 1, 0, 0] # for 0.5 threshold
labels = [1, 1, 1, 1, 1, 0, 0, 0, 1]
```

## Metrics

### Accuracy

How many inputs are correctly classified.

```math
accuracy = \frac{T_p + T_n}{T_p + T_n + F_p + F_n}
```

```python
from sklearn.metrics import accuracy_score

accuracy_score(predictions, labels) # 0.6666666666666666
```

### Precision

It is the accuracy for correctly predicting the positive class.
In other words, when the model predicts positive, what is the percentage of it to be truly positive?

$precision = \frac{T_p}{T_p + F_p}$$

```python
from sklearn.metrics import precision_score

# watch for order of parameters in order not to get wrong results
precision_score(labels, predictions) # 0.7142857142857143
```

### Recall (Or True Positive Rate)

It is also referred to as True Positive Rate (TPR), Hit Rate or Sensitivity.

$recall = \frac{T_p}{T_p + F_n}$$

```python
from sklearn.metrics import recall_score

recall_score(labels, predictions) # 0.8333333333333334
```

### False Positive Rate (FPR)

Also referred to as Fall Out or Type I Error Rate.

$$FPR = \frac{F_p}{F_p + T_n}$$

<!--TODO: write the code for FPR-->

### Specificity

It is the inverse of False Positive Rate.

$$ Specificity = \frac{T_n}{F_p + T_n} = 1 - \frac{F_p}{F_p + T_n}$$

<!-- TODO: write the code for specificity -->

### F1 Score

It is the harmonic mean between precision and recall.

$$f1-score = 2 * \frac{precision * recall}{precision + recall}$$

```python
from sklearn.metrics import f1_score

f1_score(labels, predictions) # 0.7692307692307692
```

### Confusion Matrix

You can use confusion matrix to extract all previous metrics from it directly.
<!-- TODO:

Define Confusion Matrix and describe its content,
Explain how to calculate TP, FP, TN, FN using it, thus all other metrics.
-->


## Thresholding

In case your model generates scores and you want to convert those scores into classes, you will need to search for thresholds to increase model performance or satisfy criteria for your problem, e.g. lower bias against Protected Class.
This process is known as Thresholding, Threshold-Tuning or Threshold-Moving.

There are many methods to find the threshold that satisfies your own conditions. These methods are illustrated in this section.

### Receiver Operating Characteristic (ROC) Curve

Note: This section is copied from [A Gentle Introduction to Threshold-Moving for Imbalanced Classification](https://machinelearningmastery.com/threshold-moving-for-imbalanced-classification/).

A ROC Curve  is a diagnostic plot that evaluates a set of probability predictions made by a model on a test dataset.
A set of different thresholds are used to interpret the true positive rate and the false positive rate of the predictions on the positive (minority) class, and the scores are plotted in a line of increasing thresholds to create a curve.
The false-positive rate is plotted on the x-axis and the true positive rate is plotted on the y-axis and the plot is referred to as the Receiver Operating Characteristic curve, or ROC curve.
A diagonal line on the plot from the bottom-left to top-right indicates the “curve” for a no-skill classifier (predicts the majority class in all cases), and a point in the top left of the plot indicates a model with perfect skill.
The curve is useful to understand the trade-off in the true-positive rate and false-positive rate for different thresholds.
The area under the ROC Curve, so-called ROC AUC, provides a single number to summarize the performance of a model in terms of its ROC Curve with a value between 0.5 (no-skill) and 1.0 (perfect skill).
The ROC Curve is a useful diagnostic tool for understanding the trade-off for different thresholds and the ROC AUC provides a useful number for comparing models based on their general capabilities.
If crisp class labels are required from a model under such an analysis, then an optimal threshold is required.
This would be a threshold on the curve that is closest to the top-left of the plot.

Note: we may either get the values to plot the curve using ```roc_curve```, and calculate geometric mean between FPR and TPR for each threshold to determine the best threshold.
Instead of using Geometric Mean, you may use Youden's J Statistic, which states that  $$J = sensitivity + Specificy - 1 = TPR + 1 - FPR - 1 = TPR - FPR$$.
Alternatively, get Area Under Curve for ROC using ```roc_auc_score```.

```python
from sklearn.metrics import roc_curve, roc_auc_score
import matplotlib.pyplot as plt
import numpy as np

# scores is set of probabilities generated by the model for all given inputs
fpr, tpr, thresholds = roc_curve(labels, scores)

# get the best threshold, either using geometric mean or J Statistic
geometric_means = (tpr * (1-fpr)) ** 0.5
J = tpr - fpr

best_idx = np.argmax(geometric_means)
best_idx_2 = np.argmax(J) 
print(best_idx == best_idx_2) # True
best_threshold = thresholds[best_idx]

# plot the curve
plt.plot([0,1], [0,1], linestyle='--', label='No Skill')
plt.plot(fpr, tpr, marker='.', label='Logistic')
plt.scatter(fpr[ix], tpr[ix], marker='o', color='black', label='Best')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.legend()
plt.show()
```

#### Alternative Methods

You may only count on ROC Area Under Curve (or ROC AUC for short).
This metric is 0.5 for unskilled models and 1.0 for perfect skilled model.

<!-- TODO: see how to use the function of roc_auc_score instead of roc_curve.-->

### Precision Recall Curve

Unlike the ROC Curve, a precision-recall curve focuses on the performance of a classifier on the positive (minority class) only.


[Precision](#precision) describes how good a model is at predicting the positive class.
[Recall](#recall) is calculated as the ratio of the number of true positives divided by the sum of the true positives and the false negatives.

A precision-recall curve is calculated by creating crisp class labels for probability predictions across a set of thresholds and calculating the precision and recall for each threshold.
A line plot is created for the thresholds in ascending order with recall on the x-axis and precision on the y-axis.

A no-skill model is represented by a horizontal line with a precision that is the ratio of positive examples in the dataset.
Perfect skill classifier has full precision and recall with a dot in the top-right corner.

```python
from sklearn.metrics import precision_recall_curve
import matplotlib.pyplot as plt
import numpy as np

precision, recall, thresholds = precision_recall_curve(labels, scores)

# If we optimize the harmonic mean, i.e. F1-score
f1_score = (2 * precision * recall) / (precision + recall)
best_idx = np.argmax(f1_score)

# plot the roc curve for the model
no_skill = len(testy[testy==1]) / len(testy)
plt.plot([0,1], [no_skill,no_skill], linestyle='--', label='No Skill')
plt.plot(recall, precision, marker='.', label='Logistic')
plt.scatter(recall[ix], precision[ix], marker='o', color='black', label='Best')
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.legend()
plt.show()
```

If we are interested in a threshold that results in the best balance of precision and recall, then this is the same as optimizing the F-score that summarizes the harmonic mean of both measures.

#### Alternative Methods

You can calculate the area under the precision recall curve using [sklearn.metrics.average_precision_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.average_precision_score.html).

<!-- TODO: see how to use average_precision_score instead of precision_recall_curve-->

### Grid Search for a Threshold

You may do a grid search, i.e. search all possible threshold values, and see the performance of the model when using each value to make classification.

```python
from sklearn.metrics import f1_score
import numpy as np

def labelize(scores: np.array, threshold):
    """
    given a threshold and set of scores, determine the label
        """
        return (scores >= threshold).astype('int')

thresholds = np.arange(0, 1, 0.001)
f1_scores = [f1_score(labels, labelize(scores, threshold)) for threshold in thresholds]
best_idx = np.argmax(f1_scores)
best_threshold = thresholds[best_idx]
```

* Note: Threshold finding is an optimization problem. You may use different optimization algorithms other than Grid Search.

## Averaging Methods

At the beginning of our ML project, we usually care about a single number indicating the performance of the ML system across all classes.
So, we tend to use averaging methods to get a summary for all F1 scores across classes, for instance.
In this section, we discuss different methods of averaging, and when to use each.

Note: These subsections are almost copied from [this article](https://cran.r-project.org/web/packages/yardstick/vignettes/multiclass.html)

### Macro Average

Macro averaging reduces your multiclass predictions down to multiple sets of binary predictions, calculates the corresponding metric for each of the binary cases, and then averages the results together. As an example, consider 
precision for the binary case $$Precision = \frac{T_p}{T_p + F_p}$$.

In the multiclass case, if there were levels A, B, C and D, macro averaging reduces the problem to multiple one-vs-all comparisons. The truth and estimate columns are recoded such that the only two levels are A and other, and then precision is calculated based on those recoded columns, with A being the “relevant” column. This process is repeated for the other 3 levels to get a total of 4 precision values. The results are then averaged together.

This is the formula for 'k' classes:

$Precision_{Macro} = \frac{1}{k} \sum_{i=1}^k Precision_i $$

Note that in macro averaging, all classes get equal weight when contributing their portion of the precision value to the total (here 1/4). This might not be a realistic calculation when you have a large amount of class imbalance. In that case, a weighted macro average might make more sense, where the weights are calculated by the frequency of that class in the truthcolumn.

### Weighted Average

The weighted average multiply the metric of each class by its weight in the validation/test sets, i.e. gives each metric for each class a weight.

$$Precision_{weighted} = \sum_{i=1}^k Precision_i * weight_i = \frac{1}{count_{dataset}} \sum_{i=1}^k Precision_i * count_i $$

### Micro Average

Micro averaging treats the entire set of data as an aggregate result, and calculates 1 metric rather than k metrics that get averaged together.


For precision, this works by calculating all of the true positive results for each class and using that as the numerator, and then calculating all of the true positive and false positive results for each class, and using that as the denominator.

$$Precision_{Micro} = \frac{\sum_{i=1}^k T_p_i}{\sum_{i=1}^k T_p_i + F_p_i} $$

In this case, rather than each class having equal weight, each observation gets equal weight. This gives the classes with the most observations more power.

### Micro Average vs Weighted Average

Two methods to compute the same metric over multiple classes with different function graph, i.e. if you plot both, you get different looking curves.
You may use either of those.




## References

* [A Gentle Introduction to Threshold-Moving for Imbalanced Classification](https://machinelearningmastery.com/threshold-moving-for-imbalanced-classification/)
* [MultiClass Averaging](https://cran.r-project.org/web/packages/yardstick/vignettes/multiclass.html)
* [Micro vs Macro Averaging Data Science Exchange](https://datascience.stackexchange.com/questions/15989/micro-average-vs-macro-average-performance-in-a-multiclass-classification-settin/24051#24051)
* [Precision-Recall Curve Geeks4Geeks](https://www.geeksforgeeks.org/precision-recall-curve-ml/)
* [Precision Recall Scikit-learn](https://scikit-learn.org/stable/auto_examples/model_selection/plot_precision_recall.html#)
* [True Positive Rate at Springer](https://link.springer.com/referenceworkentry/10.1007/978-1-4419-9863-7_255)
* [False Positive Rate at Springer](https://link.springer.com/referenceworkentry/10.1007/978-1-4419-9863-7_224)
* [Calculating Metrics from Confusion Matrix (Stackoverflow)](https://stackoverflow.com/questions/31324218/scikit-learn-how-to-obtain-true-positive-true-negative-false-positive-and-fal)
