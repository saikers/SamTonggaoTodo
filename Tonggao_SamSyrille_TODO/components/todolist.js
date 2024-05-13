// components/todolist.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';
import useStore from './store';

const ToDoList = () => {
  const { todos, addTodo, deleteTodo, editTodo } = useStore();
  const [todo, setTodo] = useState({
    name: '',
    schoolId: '',
    sectionCode: '',
    courseDescription: '',
    courseName: '',
    academicYear: '',
    idPicture: ''
  });
  const [editId, setEditId] = useState(null);

  const handleInputChange = (name, value) => {
    setTodo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitTodo = () => {
    if (editId) {
      editTodo({
        ...todo,
        id: editId
      });
      setEditId(null);
    } else {
      addTodo({
        ...todo,
        id: Date.now().toString() // Using timestamp as unique id
      });
    }
    clearForm();
  };

  const clearForm = () => {
    setTodo({
      name: '',
      schoolId: '',
      sectionCode: '',
      courseDescription: '',
      courseName: '',
      academicYear: '',
      idPicture: ''
    });
  };

  const handleEdit = (item) => {
    setTodo(item);
    setEditId(item.id);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Name" value={todo.name} onChangeText={(text) => handleInputChange('name', text)} />
      <TextInput style={styles.input} placeholder="School ID" value={todo.schoolId} onChangeText={(text) => handleInputChange('schoolId', text)} />
      <TextInput style={styles.input} placeholder="Section Code" value={todo.sectionCode} onChangeText={(text) => handleInputChange('sectionCode', text)} />
      <TextInput style={styles.input} placeholder="Course Description" value={todo.courseDescription} onChangeText={(text) => handleInputChange('courseDescription', text)} />
      <TextInput style={styles.input} placeholder="Course Name" value={todo.courseName} onChangeText={(text) => handleInputChange('courseName', text)} />
      <TextInput style={styles.input} placeholder="Academic Year" value={todo.academicYear} onChangeText={(text) => handleInputChange('academicYear', text)} />
      <TextInput style={styles.input} placeholder="ID Picture URL" value={todo.idPicture} onChangeText={(text) => handleInputChange('idPicture', text)} />
      <Button title={editId ? 'Update Todo' : 'Add Todo'} onPress={submitTodo} />
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.idPicture }} style={styles.image} />
            <Text>{item.name} - {item.schoolId}</Text>
            <Text>{item.courseName} ({item.academicYear})</Text>
            <Button title="Edit" onPress={() => handleEdit(item)} />
            <Button title="Delete" onPress={() => deleteTodo(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#964B00", // Changed background color
    paddingTop: 30,
  },
  button: {
    backgroundColor: "#6F4E37",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10, 
    width: "45%",
  },
  buttonText: {
    color: "  #FDFD96", // Changed text color
    textAlign: "center",
  },
  input: {
    height: 40,
    marginBottom: 12,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#87CEEB",
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 5,
  }
});

export default ToDoList;
