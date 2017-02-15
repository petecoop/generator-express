{% extends 'layout.swig' %}

{% block content %}
  <h1>{{ title }}</h1>
  <ul>
    {% for article in articles %}
      <a href="/articles/{{ article._id }}" >{{ article.title }}</a>
    {% endfor %}
  </ul>
{% endblock %}
