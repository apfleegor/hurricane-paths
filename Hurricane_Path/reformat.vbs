Attribute VB_Name = "Module1"
Sub reformat()

' find last row
lastrow = Cells(Rows.Count, 1).End(xlUp).Row

' insert column
Range("A1").EntireColumn.Insert

' declare variables
Dim currentHurricane As String

' loop through rows

For Row = 1 To lastrow
    
    ' name in c and number of data points in d
    If Cells(Row, 2) Like "AL*" Then
        currentHurricane = Cells(Row, 3).Value
    Else
        Cells(Row, 1).Value = currentHurricane
    End If
    
Next Row

End Sub
