<template>
<div>

<vue-markdown source="
## INTRODUCTION

This is the introduction page for help using vue-markdown.

This is a list
- item1
- item2
- item 3

#### Sub Heading

*italics*

**Bold**
"/>

</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  name: "help-intro",
  components: {
    'vue-markdown': VueMarkdown
  }
}
</script>
