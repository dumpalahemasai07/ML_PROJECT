# 🛍️ Customer Segmentation Using K-Means and Hierarchical Clustering | Machine Learning

An end-to-end Machine Learning project that analyzes customer income and spending behaviour to identify meaningful customer segments. The project uses K-Means Clustering, Hierarchical Clustering, data visualization, and an interactive Gradio web application to make customer segmentation easier to understand.

## 📌 About the Project

Understanding customer behaviour is important for businesses because not every customer has the same income, spending habits, or purchasing patterns. By grouping customers with similar characteristics, businesses can better understand their audience and develop suitable marketing strategies.

In this project, I use unsupervised Machine Learning techniques to group customers based on their characteristics. I also explore different visualizations to understand the clusters and compare the results of two clustering algorithms.

To make the project more interactive, I developed a Gradio-based web application called **AI Customer Segmentation System**. Users can enter a customer's annual income and spending score to obtain a predicted customer segment and a corresponding business recommendation.

The project uses a synthetic dataset containing **10 lakh (1,000,000) customer records** to demonstrate customer segmentation on a large dataset.

## 🎯 Project Objectives

- Analyze customer income and spending patterns.
- Apply K-Means Clustering to identify groups of similar customers.
- Apply Hierarchical Clustering to study relationships between customer groups.
- Use the Elbow Method to help select a suitable number of clusters.
- Evaluate clustering quality using the Silhouette Score.
- Visualize customer distributions, cluster centroids, and segment characteristics.
- Compare K-Means and Hierarchical Clustering results.
- Build an interactive web application for customer segment prediction.
- Generate business-oriented recommendations based on predicted customer segments.

## 📂 Dataset Information

**Dataset filename:** `Customer_Segmentation_ML_1_Million.csv`

The dataset contains 1,000,000 records and 9 columns.

| Column | Description |
|---|---|
| `CustomerID` | Unique identifier assigned to each customer |
| `Genre` | Customer demographic category |
| `Age` | Customer age |
| `Annual Income (k$)` | Annual income expressed in thousands of dollars |
| `Spending Score (1-100)` | Score representing customer spending behaviour |
| `Purchase Frequency (per year)` | Number of purchases per year |
| `Average Purchase Value ($)` | Average purchase amount |
| `Customer Tenure (Months)` | Duration of the customer relationship in months |
| `Total Spending ($, annualized)` | Estimated annual spending |

**Dataset note:** The dataset contains synthetic customer records created for this project. It does not represent one million real customers or actual transactions.

## 🧠 Machine Learning Algorithms

### 1. K-Means Clustering

K-Means is an unsupervised Machine Learning algorithm that divides data points into a specified number of clusters based on their similarity.

In this project, K-Means is used to group customers according to their selected numerical features, particularly annual income and spending score.

The process includes:
- Preparing the customer data.
- Scaling the selected features where appropriate.
- Using the Elbow Method to examine suitable cluster counts.
- Training the K-Means model.
- Assigning customers to clusters.
- Analyzing cluster centroids and customer characteristics.
- Evaluating the clustering results using the Silhouette Score.

### 2. Hierarchical Clustering

Hierarchical Clustering builds a hierarchy of clusters by progressively merging similar data points.

This project uses **Agglomerative Hierarchical Clustering** with Euclidean distance and Ward linkage.

The process includes:
- Selecting a representative sample of customer records.
- Applying Agglomerative Clustering.
- Visualizing the hierarchy using a dendrogram.
- Plotting the resulting customer groups.
- Comparing the results with K-Means clustering.

Since Hierarchical Clustering is computationally expensive for very large datasets, this analysis uses a manageable sample rather than all one million records.

## 📊 Data Visualization

Visualizations help explain the data distribution and make the clustering results easier to interpret.

The notebook includes separate code cells for the following graphs:

1. **Customer Distribution Before Clustering** — displays the distribution of customers according to the selected features.
2. **Elbow Method** — helps identify a suitable number of clusters for K-Means.
3. **K-Means Customer Segmentation** — displays the customer groups identified by K-Means.
4. **Cluster Centroids** — highlights the central characteristics of the identified clusters.
5. **Customer Segment Distribution** — shows how customers are distributed among clusters.
6. **Cluster Profile Comparison** — compares the characteristics of different customer groups.
7. **Hierarchical Clustering Visualization** — displays the clusters identified using the hierarchical method.
8. **Dendrogram** — illustrates the hierarchical merging of customer groups.
9. **K-Means vs. Hierarchical Clustering** — compares the clustering results visually.
10. **Clustering Evaluation** — presents available evaluation metrics, including the Silhouette Score.
11. **Feature Distribution Graphs** — helps explore the characteristics of the dataset.

Large datasets may be sampled for visualization so that the graphs remain readable and computationally manageable.

## 📈 Model Evaluation

The project uses the following techniques to examine the clustering results.

### Elbow Method

The Elbow Method plots the Within-Cluster Sum of Squares (WCSS) against the number of clusters. The point at which the improvement begins to decrease more slowly can help identify a suitable cluster count.

### Silhouette Score

The Silhouette Score measures how similar a data point is to its own cluster compared with other clusters. A higher score generally indicates better-separated clusters.

For performance reasons, the Silhouette Score can be calculated on a reproducible representative sample rather than all one million records.

### Cluster Centroid Analysis

Cluster centroids help describe the typical income and spending characteristics of each group. These characteristics can then be used to assign understandable customer segment names.

Actual cluster counts, centroids, and evaluation scores should be taken from the executed notebook rather than assumed in advance.

## 🌐 Interactive Web Application

The project includes a Gradio application named **AI Customer Segmentation System**.

The application allows users to enter:
- Annual customer income in dollars.
- Spending score between 1 and 100.

After submission, the application displays:
- The predicted customer segment.
- A corresponding business recommendation.

The application uses the trained K-Means model to classify the supplied income and spending score. Income is converted to the scale expected by the model before prediction.

This interface provides a simple way to demonstrate the project's results without manually running the clustering algorithm for each new input.

## 🛠️ Technologies Used

- **Python** — main programming language.
- **Google Colab** — development and execution environment.
- **Pandas** — dataset loading and manipulation.
- **NumPy** — numerical computations.
- **Matplotlib** — graph creation.
- **Seaborn** — statistical data visualization.
- **Scikit-learn** — K-Means, Hierarchical Clustering, preprocessing, and evaluation.
- **SciPy** — hierarchical clustering and dendrogram generation.
- **Gradio** — interactive web application.

## ⚙️ How to Run the Project

### Step 1: Open the notebook

Open `ML_project.ipynb` in Google Colab.

### Step 2: Upload the dataset

Upload `Customer_Segmentation_ML_1_Million.csv` using the Files panel in Google Colab.

Make sure the filename matches the one used in the notebook.

### Step 3: Install the required libraries

Run this cell if the libraries are not already installed:

```python
!pip install -q pandas numpy matplotlib seaborn scikit-learn scipy gradio
```

### Step 4: Execute the notebook

Run the notebook cells in order.

The notebook performs data loading, preprocessing, clustering, model evaluation, visualization, cluster interpretation, and application setup.

### Step 5: Explore the graphs

Run the separate visualization cells to view the customer distributions, Elbow Method, cluster centroids, hierarchical clustering results, and comparison graphs.

### Step 6: Launch the web application

Run the Gradio application cell. Open the generated application link and enter an annual income and spending score to view the predicted segment and recommendation.

**Note:** Hierarchical Clustering and dendrogram generation use a representative sample to avoid excessive computational requirements.

## 💡 What I Learned

Working on this project helped me understand how unsupervised Machine Learning can be applied to a practical business problem.

Some of the main things I learned include:

- Loading, inspecting, and preprocessing a large dataset.
- Selecting suitable features for clustering.
- Applying K-Means and Hierarchical Clustering.
- Using the Elbow Method to examine cluster counts.
- Evaluating clustering results with the Silhouette Score.
- Creating and interpreting different data visualizations.
- Building an interactive application with Gradio.
- Understanding the importance of computational efficiency when working with large datasets.

## 🚀 Future Improvements

Some possible improvements for this project include:

- Using real customer transaction data from an appropriate, licensed source.
- Comparing additional clustering algorithms, such as DBSCAN.
- Exploring additional features and evaluating their effect on cluster quality.
- Improving customer profile analysis and business recommendations.
- Adding an interactive dashboard with more detailed customer analytics.
- Deploying the application on a persistent hosting platform.

## ⚠️ Limitations

- The dataset is synthetic and may not reflect real-world customer behaviour.
- Clustering results depend on feature selection, scaling, and model parameters.
- Hierarchical Clustering is performed on a sample due to computational requirements.
- Customer segment names are interpretations of cluster characteristics, not predefined ground-truth labels.
- The quality of the clustering should be assessed using actual evaluation results from the notebook.

## 📝 Conclusion

This project demonstrates how unsupervised Machine Learning can be used to explore customer behaviour and identify groups with similar characteristics.

By combining K-Means Clustering, Hierarchical Clustering, data visualization, evaluation metrics, and an interactive Gradio application, the project brings together the main stages of a customer segmentation workflow.

It also provides practical experience with data preprocessing, clustering analysis, visualization, and working with a large synthetic dataset.

## 👨‍💻 Project Details

**Project Title:** Customer Segmentation Using K-Means and Hierarchical Clustering

**Domain:** Machine Learning and Data Analysis

**Development Platform:** Google Colab

**Application Framework:** Gradio

**Dataset Size:** 1,000,000 synthetic customer records

**GitHub Repository:** [ML_PROJECT](https://github.com/dumpalahemasai07/ML_PROJECT)
